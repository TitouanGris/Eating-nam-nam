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
          <div className="card">
            <div className="recipeName">{r.recipeName}</div>
            <div className="tags">
              <img src={r.tagPriceUrl} alt="r.TagPrice" />
              <img src={r.tagDifficultyUrl} alt="r.TagDifficulty" />
              <div>
                <img src="" alt=" recipeServing" />
                <p>{r.recipeServing}</p>
              </div>
              <div>
                <img src={r.tagDurationUrl} alt="r.TagDuration" />
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
  }).isRequired,
};
export default RecipeCard;