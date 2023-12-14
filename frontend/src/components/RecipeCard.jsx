import React from "react";
import PropTypes from "prop-types";

function RecipeCard({ r }) {
  return (
    <div>
      <div key={r.recipeId}>
        <div className="recipeCard">
          <div className="imgContainer">
            <img
              src={`http://localhost:3310${r.recipeImage}`}
              alt={`${r.recipeName}`}
            />
          </div>
          <div className="recipeName"> {r.recipeName}</div>
          <div className="recipeName"> {r.tagPrice}</div>
          <div className="recipeInfos">{r.recipeServing}</div>
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
  }).isRequired,
};
export default RecipeCard;
