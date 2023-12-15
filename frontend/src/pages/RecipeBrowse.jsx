import { useEffect, useState, useContext } from "react";
import RecipeCard from "../components/RecipeCard";
import FiltersContext from "../context/FiltersContext";

function RecipeBrowse() {
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
    <div className="recipeBrowse">
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
              (!priceFilterNotEmpty || filterPrice.includes(r.tagPriceName)) &&
              (!difficultyFilterNotEmpty ||
                filterDifficulty.includes(r.tagDifficulty)) &&
              (!durationFilterNotEmpty ||
                filterDuration.includes(r.tagDuration)) &&
              (!regimeFilterNotEmpty || filterRegime.includes(r.tagRegime)) &&
              (!typeFilterNotEmpty || filterType.includes(r.tagType))
            );
          }

          // Si aucun filtre n'a de valeur, afficher toutes les recettes
          return true;
        })
        .map((r) => (
          <RecipeCard r={r} key={r.recipeId} />
        ))}
    </div>
  );
}

export default RecipeBrowse;
