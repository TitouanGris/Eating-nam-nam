import { useEffect, useState, useContext } from "react";
import { useOutletContext, Link } from "react-router-dom";

import RecipeCard from "../components/RecipeCard";
import Filters from "../components/Filters";
import FiltersContext from "../context/FiltersContext";

function RecipeBrowse() {
  const [favoriteMobileisActive, setFavoriteMobileisActive] =
    useOutletContext();

  const [recipe, setRecipe] = useState([]);
  const {
    filterCountry,
    filterDifficulty,
    filterDuration,
    filterPrice,
    filterRegime,
    filterType,
  } = useContext(FiltersContext);

  useEffect(() => {
    fetch("http://localhost:3310/api/recipe")
      .then((res) => res.json())
      .then((data) => setRecipe(data));
  }, []);

  return (
    <>
      <div className="recipeBrowse">
        <div className="recipeBrowseCard">
          {recipe
            .filter((r) => {
              // Vérifier si chaque filtre contient au moins une valeur
              const countryFilterNotEmpty = filterCountry.length > 0;
              const priceFilterNotEmpty = filterPrice.length > 0;
              const difficultyFilterNotEmpty = filterDifficulty.length > 0;
              const durationFilterNotEmpty = filterDuration.length > 0;
              const regimeFilterNotEmpty = filterRegime.length > 0;
              const typeFilterNotEmpty = filterType.length > 0;

              // Appliquer les filtres uniquement si au moins un filtre a une valeur
              if (
                countryFilterNotEmpty ||
                priceFilterNotEmpty ||
                difficultyFilterNotEmpty ||
                durationFilterNotEmpty ||
                regimeFilterNotEmpty ||
                typeFilterNotEmpty
              ) {
                return (
                  (!countryFilterNotEmpty ||
                    filterCountry.includes(r.tagCountry)) &&
                  (!priceFilterNotEmpty ||
                    filterPrice.includes(r.tagPriceName)) &&
                  (!difficultyFilterNotEmpty ||
                    filterDifficulty.includes(r.tagDifficulty)) &&
                  (!durationFilterNotEmpty ||
                    filterDuration.includes(r.tagDuration)) &&
                  (!regimeFilterNotEmpty ||
                    filterRegime.includes(r.tagRegime)) &&
                  (!typeFilterNotEmpty || filterType.includes(r.tagType))
                );
              }

              // Si aucun filtre n'a de valeur, afficher toutes les recettes
              return true;
            })
            .map((r) => {
              return (
                <Link
                  key={r.recipeId}
                  to={`http://localhost:3000/recipe/${r.recipeId}`}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <RecipeCard r={r} key={r.recipeId} />
                </Link>
              );
            })}
        </div>
      </div>
      <div
        className={
          favoriteMobileisActive
            ? "filterArea mobileshow"
            : "filterArea mobilehide"
        }
      >
        <Filters setFavoriteMobileisActive={setFavoriteMobileisActive} />
      </div>
    </>
  );
}

export default RecipeBrowse;
