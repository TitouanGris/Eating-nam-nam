import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { loadIngredientsData } from "../pages/RecipePost";
import { loadFiltersData } from "./Filters";
import Button from "./Button";
import FilterRegime from "./FilterRegime";
import FiltersContext from "../context/FiltersContext";

function Regime({ successMessage }) {
  // const { pathname } = useLocation();

  const [filterChip, setFilterChip] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ingSelected, setIngSelected] = useState([]);
  const [validate, setValidate] = useState(false);

  const { userInfos } = useUser();

  const { filterRegimeId } = useContext(FiltersContext);

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

  function handleClick(ingredient) {
    if (ingSelected.includes(ingredient.id)) {
      const temp = [...ingSelected];
      const ingIndex = temp.findIndex((ing) => {
        return ing === ingredient.id;
      });
      temp.splice(ingIndex, 1);
      setIngSelected(temp);
    } else {
      setIngSelected((current) => [...current, ingredient.id]);
    }
  }
  // on ne récupère que les filter avec tag id 3 (pour les régimes)
  const regimeTag = filterChip.filter((tag) => tag.category_id === 3);

  // todo : mettre des icons pour les régime : https://react-icons.github.io/react-icons/
  // todo : classer par ordre alphabétique les ingrédients

  const navigate = useNavigate();

  async function handleValidate() {
    setValidate((current) => !current);
    setTimeout(() => {
      navigate("/browse");
    }, 2000);

    // POST vers BACK

    // todo : faire 2 routes une pour supprimer et l'autre pour ajouter
    // pré-requis : avoir un tableau liste d'ajout et un autre de suppression
    // if (pathname === "/account") {
    //   alert("bonjour");
    // } else {
    try {
      await axios.post("http://localhost:3310/api/useringredients", {
        // on INSERT dans la DB avec les infos saisies
        userInfosId: userInfos.id,
        ingSelected,
      });
    } catch (error) {
      console.error(error);
    }

    try {
      await axios.post("http://localhost:3310/api/usertags", {
        // on INSERT dans la DB avec les infos saisies
        userInfosId: userInfos.id,
        filterRegimeId,
      });
    } catch (error) {
      console.error(error);
    }
    // }

    // updatePreferences(filterRegimeId);
  }

  return (
    <div className="regime-container">
      {validate && (
        <div className="message">
          <p> {successMessage}</p>
        </div>
      )}

      {!validate && (
        <div className="regime">
          <div className="titleRegimeTag">
            {" "}
            <h1>Votre régime</h1>
            <p>Sélectionner vos préférences (si vous en avez)</p>
          </div>
          <div className="regimeTag">
            <FilterRegime regimeTag={regimeTag} />
          </div>
          <div className="titleIngredientTag">
            {" "}
            <h1>Ingrédients à exclure</h1>
            <p>
              Quels sont les ingrédients qui n’iront pas dans votre assiette ?
            </p>
          </div>
          <div className="ingredientTagContainer">
            {" "}
            {ingredients.map((ingredient) => {
              return (
                <Button
                  label={ingredient.name}
                  key={ingredient.id}
                  value={ingredient.id}
                  // style={{ borderRadius: "0px", backgroundColor: "green" }}
                  onClick={() => handleClick(ingredient)}
                  className={
                    ingSelected.includes(ingredient.id)
                      ? "buttonIng1"
                      : "buttonIng2"
                  }
                />
              );
            })}
          </div>

          <div className="validateBtn">
            <Button
              label="Valider"
              // eslint-disable-next-line react/jsx-no-bind
              onClick={handleValidate}
              className="button1"
            />
          </div>
        </div>
      )}
    </div>
  );
}

Regime.propTypes = {
  successMessage: PropTypes.string.isRequired,
};

export default Regime;
