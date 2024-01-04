import { useEffect, useState } from "react";
import FilterRegime from "../components/FilterRegime";
import { loadIngredientsData } from "./RecipePost";
import { loadFiltersData } from "../components/Filters";

function Regime() {
  const [filterChip, setFilterChip] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  // on récupère les données en important les loaders ingrédients et filter
  async function loadData() {
    const ing = await loadIngredientsData();
    setIngredients(ing);

    const filter = await loadFiltersData();
    setFilterChip(filter);
  }

  /// le use effect est nécéssaire pour accompagner l'effet async
  useEffect(() => {
    loadData();
  }, []);

  // on ne récupère que les filter avec tag id 3 (pour les régimes)
  const regimeTag = filterChip.filter((tag) => tag.category_id === 3);

  // todo : mettre des icons pour les régime : https://react-icons.github.io/react-icons/
  // todo : virer la route /regime pour gérer en modal finalement (donc ce jsx à mettre en composant + code modal tel que connexion)
  return (
    <div className="regime">
      <div className="titleRegimeTag">
        {" "}
        <h3>Votre régime</h3>
        <p>Sélectionner vos préférences (si vous en avez)</p>
      </div>
      <div className="regimeTag">
        <FilterRegime regimeTag={regimeTag} />
      </div>
      <div className="titleIngredientTag">
        {" "}
        <h3>Ingrédients à exclure</h3>
        <p>Quels sont les ingrédients qui n’iront pas dans votre assiette ?</p>
      </div>
      <div className="ingredientTag">
        {" "}
        {ingredients.map((ingredient) => {
          return (
            <option key={ingredient.id} value={ingredient.name}>
              {ingredient.name}
            </option>
          );
        })}
      </div>
    </div>
  );
}

export default Regime;
