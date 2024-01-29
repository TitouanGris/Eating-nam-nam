import { useEffect, useState, useContext } from "react";
import { useOutletContext, Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import Filters from "../components/Filters";
import FiltersContext from "../context/FiltersContext";
import { useUser } from "../context/UserContext";

export const loadRecipeData = async () => {
  try {
    const RecipeData = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/recipe`
    );
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

  const { favorisBtn } = useUser();

  const [recipe, setRecipe] = useState([]);

  const {
    filterCountry,
    filterDifficulty,
    filterDuration,
    filterPrice,
    filterRegime,
    filterType,
    favorisTable,
  } = useContext(FiltersContext);

  async function loadData() {
    const recipeData = await loadRecipeData();

    if (!favorisBtn) {
      setRecipe(recipeData);
    } else {
      const recipeDataFavoris = recipeData.filter((r) => {
        return favorisTable.includes(r.recipeId);
      });

      setRecipe(recipeDataFavoris);
    }
  }

  useEffect(() => {
    loadData();
    // const user = JSON.parse(localStorage.user);
    // setUserInfos(user);
  }, [favorisBtn, favorisTable]);

  return (
    <div className="recipeBrowse">
      <div className="recipeBrowseCard">
        {recipe.length === 0 && (
          <div className="noFav"> Vous n'avez pas de favoris</div>
        )}
        {recipe
          .filter((r) => {
            // Vérifie si chaque filtre contient au moins une valeur
            const countryFilterNotEmpty = filterCountry.length > 0;
            const priceFilterNotEmpty = filterPrice.length > 0;
            const difficultyFilterNotEmpty = filterDifficulty.length > 0;
            const durationFilterNotEmpty = filterDuration.length > 0;
            const regimeFilterNotEmpty = filterRegime.length > 0;
            const typeFilterNotEmpty = filterType.length > 0;

            // Applique les filtres uniquement si au moins un filtre a une valeur
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
                to={`/recipe/${r.recipeId}`}
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
