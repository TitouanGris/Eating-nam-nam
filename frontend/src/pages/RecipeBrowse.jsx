import { useEffect, useState, useContext } from "react";
import { useOutletContext, Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import Filters from "../components/Filters";
import FiltersContext from "../context/FiltersContext";

export const loadRecipeData = async () => {
  try {
    const RecipeData = await fetch("http://localhost:3310/api/recipe");
    const data = await RecipeData.json();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

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

  async function loadData() {
    const recipeData = await loadRecipeData();
    setRecipe(recipeData);
  }

  useEffect(() => {
    loadData();
  }, []);

  // console.log(recipe.country[0])

  return (
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
                  filterCountry.includes(
                    r.country ? r.country[0].tagName : ""
                  )) &&
                (!priceFilterNotEmpty ||
                  filterPrice.includes(r.price ? r.price[0].tagName : "")) &&
                (!difficultyFilterNotEmpty ||
                  filterDifficulty.includes(
                    r.difficulty ? r.difficulty[0].tagName : ""
                  )) &&
                (!durationFilterNotEmpty ||
                  filterDuration.includes(
                    r.duration ? r.duration[0].tagName : ""
                  )) &&
                (!regimeFilterNotEmpty ||
                  filterRegime.includes(r.regime ? r.regime[0].tagName : "")) &&
                (!typeFilterNotEmpty ||
                  filterType.includes(r.type ? r.type[0].tagName : ""))
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
      <div
        className={
          favoriteMobileisActive
            ? "filterArea mobileshow"
            : "filterArea mobilehide"
        }
      >
        <Filters setFavoriteMobileisActive={setFavoriteMobileisActive} />
      </div>
    </div>
  );
}

export default RecipeBrowse;
