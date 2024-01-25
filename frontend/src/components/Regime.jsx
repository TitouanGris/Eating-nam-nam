import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { useUser } from "../context/UserContext";
// import { loadIngredientsData } from "../pages/RecipePost";
import { loadFiltersData } from "./Filters";
import Button from "./Button";
import FilterRegime from "./FilterRegime";
import FilterCountry from "./FilterCountry";
import FilterPrice from "./FilterPrice";
import FiltersContext from "../context/FiltersContext";
import FilterDifficuly from "./FilterDifficuly";

function Regime({ successMessage }) {
  const [filterChip, setFilterChip] = useState([]);

  const [validate, setValidate] = useState(false);

  const { userInfos } = useUser();

  const { filterRegimeId, filterPriceId, filterCountryId, filterDifficultyId } =
    useContext(FiltersContext);

  // on récupère les données en important le loader filter
  async function loadData() {
    const filter = await loadFiltersData();
    setFilterChip(filter);
  }

  // le use effect est nécéssaire pour accompagner l'effet async
  useEffect(() => {
    loadData();
  }, []);

  // on ne récupère que les filter avec tag id 3 (pour les régimes)
  const regimeTag = filterChip.filter((tag) => tag.category_id === 3);
  // on ne récupère que les filter avec tag id 2 (pour les pays)
  const countryTag = filterChip.filter((tag) => tag.category_id === 2);
  // on ne récupère que les filter avec tag id 1 (pour les prix)
  const priceTag = filterChip.filter((tag) => tag.category_id === 1);

  // on ne récupère que les filter avec tag id 4 (pour les difficulté)
  const difficultyTag = filterChip.filter((tag) => tag.category_id === 4);

  const navigate = useNavigate();

  async function handleValidate() {
    setValidate((current) => !current);
    setTimeout(() => {
      navigate("/browse");
    }, 2000);

    try {
      const filterIdChosen = [
        filterRegimeId,
        filterPriceId,
        filterCountryId,
        filterDifficultyId,
      ];

      const filterIdChosenReduced = filterIdChosen.reduce(
        (acc, currentArray) => acc.concat(currentArray),
        []
      );

      // if(){
      //   // faire une condition quand le user clique sur une preference verifier si cette preference existe dans la table user_tags
      //   // si oui : faire une requete pour delete id du tags cliqué
      // }
      // // on delete dans la table user_tags
      // await axios.delete("http://localhost:3310/api/usertags", {
      //   // on DELETE dans la DB avec les infos deselectionnées
      //   userInfosId: userInfos.id,
      //   filterIdChosenReduced,
      // });

      await axios.post("http://localhost:3310/api/usertags", {
        // on INSERT dans la DB avec les infos saisies
        userInfosId: userInfos.id,
        filterIdChosenReduced,
      });
    } catch (error) {
      console.error(error);
    }
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
          <p>Sélectionner vos préférences (si vous en avez)</p>

          <div className="regimeTag">
            <FilterRegime regimeTag={regimeTag} />
          </div>

          <div className="CountryTag">
            <FilterCountry countryTag={countryTag} />
          </div>

          <div className="priceTag">
            <FilterPrice priceTag={priceTag} />
          </div>

          <div className="difficultyTag">
            <FilterDifficuly difficultyTag={difficultyTag} />
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
