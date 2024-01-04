import { useLoaderData, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function RecipeDetails() {
  const recipe = useLoaderData();
  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [tags, setTags] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3310/api/step/${id}`)
      .then((res) => res.json())
      .then((data) => setSteps(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3310/api/ingredients/${id}`)
      .then((res) => res.json())
      .then((data) => setIngredients(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3310/api/tags/recipe/${id}`)
      .then((res) => res.json())
      .then((data) => setTags(data));
  }, []);

  return (
    <div className="recipeDetails">
      <div className="recipeDetailsHeader">
        <Link to="http://localhost:3000/browse">
          <img src="/src/assets/images/back.png" alt="Back Arrow" />
        </Link>
        <h2>{recipe.recipeName}</h2>
      </div>
      <div className="imgContainer">
        <img
          src={
            recipe.recipeImage
              ? `http://localhost:3310${recipe.recipeImage}`
              : "/src/assets/images/logo.png"
          }
          alt={`${recipe.recipeName}`}
        />
      </div>
      <div className="card">
        <div className="tags">
          <div className="price">
            <img
              src={`http://localhost:3310${recipe.price[0].tagUrl}`}
              alt="r.TagPrice"
            />
          </div>
          <div className="difficulty">
            <img
              src={`http://localhost:3310${recipe.difficulty[0].tagUrl}`}
              alt="r.TagDifficulty"
            />
          </div>
          <div className="serving">
            <img
              src="/src/assets/images/nbServingImage.png"
              alt="recipeServing"
            />
            <p>{recipe.recipeServing}</p>
          </div>
          <div className="duration">
            <img src="/src/assets/images/durationImage.png" alt="TagDuration" />
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
      </div>
    </div>
  );
}

export const loadRecipeDetails = async ({ params }) => {
  try {
    const recipeDetails = await fetch(
      `http://localhost:3310/api/recipe/${params.id}`
    );
    const data = await recipeDetails.json();
    return data[0];
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default RecipeDetails;
