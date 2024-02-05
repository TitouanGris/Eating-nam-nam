import { React, useContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import FiltersContext from "../context/FiltersContext";
import { useUser } from "../context/UserContext";

function RecipeCard({ r }) {
  const { favorisTable, setFavorisTable } = useContext(FiltersContext);
  const { userInfos } = useUser();
  const [favoris, setFavoris] = useState(false);

  async function postFavoris() {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/favoris`, {
        userId: userInfos.id,
        recipeId: r.recipeId,
      });

      // get pour récupérer la table favoris à jour de la DB avec le user ID
      try {
        const favorisDb = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/favoris/${userInfos.id}`
        );

        setFavorisTable(favorisDb.data);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteFavoris() {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/favoris`, {
        userId: userInfos.id,
        recipeId: r.recipeId,
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (favorisTable) {
      if (favorisTable.find((e) => e === r.recipeId)) {
        setFavoris(true);
        // post vers back pour ajouter le couple r.recipeId et User ID
      } else {
        setFavoris(false);
        // post vers back pour supprimer le couple r.recipeId et User ID
      }
    }
  }, [setFavorisTable]);

  function handleClick(event) {
    event.stopPropagation();
    event.preventDefault();
    setFavoris((current) => !current);
    const temp = [...favorisTable];
    if (temp.includes(r.recipeId) === true) {
      const tagIndex = temp.findIndex((item) => {
        return item === r.recipeId;
      });
      temp.splice(tagIndex, 1);

      deleteFavoris();
      setFavorisTable(temp);
    } else {
      temp.push(r.recipeId);

      postFavoris();
      setFavorisTable(temp);
    }

    localStorage.setItem("favoris", JSON.stringify(favorisTable));
  }

  return (
    <div className="recipeCard">
      <div className="favoris">
        <button className="heart" type="button" onClick={handleClick}>
          {favoris ? (
            <img src="/heartFill.png" alt="favoris coeur plein" />
          ) : (
            <img src="/heartEmpty.png" alt="favoris coeur vide" />
          )}
        </button>
      </div>
      <div className="imgContainer">
        <img
          src={
            r.recipeImage !== "/images/undefined"
              ? `${import.meta.env.VITE_BACKEND_URL}${r.recipeImage}`
              : "/logo.png"
          }
          alt={`${r.recipeName}`}
        />
      </div>
      <div className="card">
        <div className="recipeName">{r.recipeName}</div>
        <div className="tags">
          <div className="price">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${r.price[0].tagUrl}`}
              alt="r.TagPrice"
            />
          </div>
          <div className="difficulty">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${
                r.difficulty[0].tagUrl
              }`}
              alt="r.TagDifficulty"
            />
            <p>{r.difficulty[0].tagName}</p>
          </div>
          <div className="serving">
            <img src="/nbServingImage.png" alt="recipeServing" />
            <p>{r.recipeServing}</p>
          </div>
          <div className="duration">
            <img src="/durationImage.png" alt="TagDuration" />
            <p>{r.duration[0].tagName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

RecipeCard.propTypes = {
  r: PropTypes.shape({
    recipeId: PropTypes.number,
    recipeName: PropTypes.string,
    recipeImage: PropTypes.string,
    recipeServing: PropTypes.number,
    tagPrice: PropTypes.string,
    tagCountry: PropTypes.string,
    tagRegime: PropTypes.string,
    tagDifficulty: PropTypes.string,
    tagDuration: PropTypes.string,
    tagType: PropTypes.string,
    tagTypeUrl: PropTypes.string,
    tagRegimeUrl: PropTypes.string,
    tagDifficultyUrl: PropTypes.string,
    tagDurationUrl: PropTypes.string,
    tagPriceUrl: PropTypes.string,
    price: PropTypes.string,
    difficulty: PropTypes.string,
    tagUrl: PropTypes.string,
    duration: PropTypes.string,
  }).isRequired,
};
export default RecipeCard;
