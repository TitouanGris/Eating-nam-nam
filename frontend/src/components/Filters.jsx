import { useContext } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "./Button";
import FiltersContext from "../context/FiltersContext";
import FilterCategorys from "./FilterCategorys";
import FilterCountry from "./FilterCountry";
import FilterPrice from "./FilterPrice";
import FilterDifficuly from "./FilterDifficuly";
import FilterRegime from "./FilterRegime";
import FilterDuration from "./FilterDuration";

function Filters({ setFavoriteMobileisActive }) {
  const filters = useLoaderData();
  const {
    setFilterCountry,
    setFilterDifficulty,
    setFilterDuration,
    setFilterPrice,
    setFilterRegime,
    setFilterType,
  } = useContext(FiltersContext);
  const resetClick = () => {
    setFilterPrice([]);
    setFilterDifficulty([]);
    setFilterDuration([]);
    setFilterRegime([]);
    setFilterCountry([]);
    setFilterType([]);
  };

  const difficultyTag = filters.filter((tag) => tag.category_id === 4);
  const regimeTag = filters.filter((tag) => tag.category_id === 3);
  const durationTag = filters.filter((tag) => tag.category_id === 5);
  const priceTag = filters.filter((tag) => tag.category_id === 1);
  const countryTag = filters.filter((tag) => tag.category_id === 2);
  const typeTag = filters.filter((tag) => tag.category_id === 6);
  function handleClick() {
    setFavoriteMobileisActive((current) => !current);
  }
  return (
    <div className="filters">
      <div className="filters-header">
        <NavLink to="/browse">
          <button onClick={handleClick} type="button">
            :flèche_gauche:
          </button>
        </NavLink>
        <p>Mes filtres</p>
        <div className="filters-button-container">
          <Button
            label="réinitialiser"
            onClick={resetClick}
            className="reset-button"
          />
        </div>
      </div>
      <div className="filters-box">
        <FilterCategorys typeTag={typeTag} />
        <div className="separationBarre" />
        <FilterCountry countryTag={countryTag} />
        <div className="separationBarre" />
        <FilterPrice priceTag={priceTag} />
        <div className="separationBarre" />
        <FilterDifficuly difficultyTag={difficultyTag} />
        <div className="separationBarre" />
        <FilterRegime regimeTag={regimeTag} />
        <div className="separationBarre" />
        <FilterDuration durationTag={durationTag} />
      </div>
    </div>
  );
}
Filters.propTypes = {
  setFavoriteMobileisActive: PropTypes.func.isRequired,
};
export const loadFiltersData = async () => {
  try {
    const filtersData = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/tags`
    );
    const data = await filtersData.json();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
export default Filters;
