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

  const [recipeFiltred, setRecipeFiltred] = useState([]);

  const [searchText, setSearchText] = useState("");

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
    let resultData = [];

    if (!favorisBtn) {
      setRecipe(recipeData);
      resultData = [...recipeData];
    } else {
      const recipeDataFavoris = recipeData.filter((r) => {
        return favorisTable.includes(r.recipeId);
      });

      setRecipe(recipeDataFavoris);
      resultData = [...recipeDataFavoris];
    }

    const tabrecipeFiltred = resultData.filter((r) => {
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
            filterCountry.includes(r.country ? r.country[0].tagName : "")) &&
          (!priceFilterNotEmpty ||
            filterPrice.includes(r.price ? r.price[0].tagName : "")) &&
          (!difficultyFilterNotEmpty ||
            filterDifficulty.includes(
              r.difficulty ? r.difficulty[0].tagName : ""
            )) &&
          (!durationFilterNotEmpty ||
            filterDuration.includes(r.duration ? r.duration[0].tagName : "")) &&
          (!regimeFilterNotEmpty ||
            filterRegime.includes(r.regime ? r.regime[0].tagName : "")) &&
          (!typeFilterNotEmpty ||
            filterType.includes(r.type ? r.type[0].tagName : ""))
        );
      }
      // Si aucun filtre n'a de valeur, afficher toutes les recettes
      return true;
    });

    // setRecipeFiltred(tabrecipeFiltred);

    // SearchBar :

    const tabrecipeFiltredSearchBar = tabrecipeFiltred.filter((e) => {
      return e.recipeName.toLowerCase().includes(searchText.toLowerCase());
    });

    setRecipeFiltred(tabrecipeFiltredSearchBar);
  }

  useEffect(() => {
    loadData();
    // const user = JSON.parse(localStorage.user);
    // setUserInfos(user);
  }, [
    favorisBtn,
    favorisTable,
    filterCountry,
    filterDifficulty,
    filterDuration,
    filterPrice,
    filterRegime,
    filterType,
    searchText,
  ]);

  // useEffect(() => {}, [
  //   filterCountry,
  //   filterDifficulty,
  //   filterDuration,
  //   filterPrice,
  //   filterRegime,
  //   filterType,
  //   favorisTable,
  //   favorisBtn,
  // ]);

  return (
    <div className="recipeBrowse">
      <div className="leftArea">
        <div className="searchBar">
          <input
            type="text"
            value={searchText}
            placeholder="Que souhaitez-vous cuisiner ?"
            onInput={(event) => {
              setSearchText(event.target.value);
            }}
          />
        </div>
        <div className="recipeBrowseCard">
          {recipe.length === 0 && <div> Vous n'avez pas de favoris</div>}
          {recipeFiltred.length === 0 && (
            <div>
              {" "}
              Désolé, nous n'avons pas trouvé de recette correspondant à vos
              filtres
            </div>
          )}
          {recipeFiltred.map((r) => {
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
