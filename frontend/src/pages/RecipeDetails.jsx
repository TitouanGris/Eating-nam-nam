import { useLoaderData, useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import Button from "../components/Button";
import { useUser } from "../context/UserContext";

function RecipeDetails() {
  const recipe = useLoaderData();
  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const fetchComments = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/comments/recipe/${id}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  };

  const { userInfos } = useUser();

  useEffect(() => {
    console.info(userInfos);
  }, [userInfos]);

  async function postComment(event) {
    event.preventDefault();

    try {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/comment`, {
          userId: userInfos.id,
          recipeId: recipe.recipeId,
          message: newComment,
        })
        .then(() => {
          fetchComments();
          setNewComment("");
        });
    } catch (err) {
      console.error(err);
    }
  }

  async function validateRecipe(recipeId) {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipe/${recipeId}/validate`
      );
      navigate("/account/admin");
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteRecipe(recipeId) {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipe/${recipeId}`
      );
      navigate("/account/admin");
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/step/${id}`)
      .then((res) => res.json())
      .then((data) => setSteps(data));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ingredients/${id}`)
      .then((res) => res.json())
      .then((data) => setIngredients(data));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tags/recipe/${id}`)
      .then((res) => res.json())
      .then((data) => setTags(data));
  }, []);
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="recipeDetails">
      <div className="recipeDetailsHeader">
        <div className="recipeName">
          <Link to={-1}>
            <img src="/back.png" alt="Back Arrow" />
          </Link>
          <h2>
            {recipe.recipeName.length > 25
              ? `${recipe.recipeName.substring(0, 25)}...`
              : recipe.recipeName}
          </h2>
        </div>
        {userInfos.is_admin === 1 && recipe.validate_recipe === 0 && (
          <div className="validate_button">
            <Button
              label={
                <>
                  <FaCheck size="25px" /> Valider
                </>
              }
              className="buttonGreen"
              onClick={() => validateRecipe(id)}
            />
            <Button
              label={
                <>
                  <MdDelete size="25px" />
                  Supprimer
                </>
              }
              className="buttonRed"
              onClick={() => deleteRecipe(id)}
            >
              {" "}
            </Button>
          </div>
        )}
      </div>
      <div className="imgContainer">
        <img
          src={
            recipe.recipeImage !== "/images/undefined"
              ? `${import.meta.env.VITE_BACKEND_URL}${recipe.recipeImage}`
              : "/logo.png"
          }
          alt={`${recipe.recipeName}`}
        />
      </div>
      <div className="card">
        <div className="tags">
          <div className="price">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${
                recipe.price[0].tagUrl
              }`}
              alt="r.TagPrice"
            />
          </div>
          <div className="difficulty">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${
                recipe.difficulty[0].tagUrl
              }`}
              alt="r.TagDifficulty"
            />
          </div>
          <div className="serving">
            <img src="/nbServingImage.png" alt="recipeServing" />
            <p>{recipe.recipeServing}</p>
          </div>
          <div className="duration">
            <img src="/durationImage.png" alt="TagDuration" />
            <p>{recipe.duration[0].tagName}</p>
          </div>
        </div>
      </div>
      <h4 className="recipe_summary">{recipe.summary}</h4>
      <div className="recipe_tags">
        {tags.map((tag) => (
          <div key={tag.id}>{tag.name}</div>
        ))}
      </div>
      <div className="recipe_ingredientsAndSteps">
        <div className="recipe_ingredients">
          <h3>Ingrédients</h3>
          <ul>
            {ingredients.map((ingredient) => (
              <li
                key={ingredient.id}
              >{`${ingredient.quantity} ${ingredient.unitName} ${ingredient.ingredientName}`}</li>
            ))}
          </ul>
        </div>
        <div className="steps_details">
          <h3>Recette</h3>
          <ol>
            {steps.map((step) => {
              return <li key={step.id}>{step.description}</li>;
            })}
          </ol>
        </div>
        <div className="comments">
          <h3>L'avis des gourmands</h3>
          {comments.map((comment) => (
            <div key={comment.commentId}>
              <p className="comment_pseudo">{comment.pseudo}</p>
              <p>{comment.message}</p>
              <p className="comment_date">
                {new Date(comment.created_date).toLocaleString(
                  "fr-FR",
                  options
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
      {userInfos.id && (
        <div className="comment_form">
          <h3>Et vous, vous en avez pensé quoi ?</h3>
          <form onSubmit={postComment}>
            <textarea
              name="comment_text"
              placeholder="Dites-nous tout"
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
            />
            <button className="button1" type="submit">
              Commenter{" "}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export const loadRecipeDetails = async ({ params }) => {
  try {
    const recipeDetails = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/recipe/${params.id}`
    );
    const data = await recipeDetails.json();
    return data[0];
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default RecipeDetails;
