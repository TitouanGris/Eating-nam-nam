import React from "react";
import PropTypes from "prop-types";

function RecipeCard({ r }) {
  return (
    <div>
      <div>
        <div className="recipeCard">
          <div className="imgContainer">
            <img
              src={
                r.recipeImage
                  ? `http://localhost:3310${r.recipeImage}`
                  : "/src/assets/images/logo.png"
              }
              alt={`${r.recipeName}`}
            />
          </div>
          <div className="card">
            <div className="recipeName">{r.recipeName}</div>
            <div className="tags">
              <div className="price">
                <img
                  src={`http://localhost:3310${r.price[0].tagUrl}`}
                  alt="r.TagPrice"
                />
              </div>
              <div className="difficulty">
                <img
                  src={`http://localhost:3310${r.difficulty[0].tagUrl}`}
                  alt="r.TagDifficulty"
                />
              </div>
              <div className="serving">
                <img
                  src="/src/assets/images/nbServingImage.png"
                  alt="recipeServing"
                />
                <p>{r.recipeServing}</p>
              </div>
              <div className="duration">
                <img
                  src="/src/assets/images/durationImage.png"
                  alt="TagDuration"
                />
                <p>{r.tagDuration}</p>
              </div>
            </div>
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
  }).isRequired,
};
export default RecipeCard;
