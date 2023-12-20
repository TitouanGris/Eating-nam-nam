import { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
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
  const [filterChip, setFilterChip] = useState([]);
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

  useEffect(() => {
    fetch("http://localhost:3310/api/tags")
      .then((res) => res.json())
      .then((data) => setFilterChip(data))
      .catch((err) => console.error(err));
  }, []);

  const difficultyTag = filterChip.filter((tag) => tag.category_id === 4);
  const regimeTag = filterChip.filter((tag) => tag.category_id === 3);
  const durationTag = filterChip.filter((tag) => tag.category_id === 5);
  const priceTag = filterChip.filter((tag) => tag.category_id === 1);
  const countryTag = filterChip.filter((tag) => tag.category_id === 2);
  const typeTag = filterChip.filter((tag) => tag.category_id === 6);

  function handleClick() {
    setFavoriteMobileisActive((current) => !current);
  }

  return (
    <div className="filters">
      <div className="filters-header">
        <NavLink to="/browse">
          <button onClick={handleClick} type="button">
            ⬅️
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

export default Filters;
