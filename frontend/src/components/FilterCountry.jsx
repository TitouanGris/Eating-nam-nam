import { useContext } from "react";
import { useLocation } from "react-router-dom";

import PropTypes from "prop-types";
import Button from "./Button";
import FiltersContext from "../context/FiltersContext";

function FilterCountry({ countryTag, setCountryChange, countryChange }) {
  const {
    filterCountry,
    setFilterCountry,
    filterCountryId,
    setFilterCountryId,
  } = useContext(FiltersContext);

  const location = useLocation();

  const handleClick = (tag) => {
    if (location.pathname === "/" || location.pathname === "/browse") {
      if (tag.category_id === 2) {
        if (filterCountry.includes(tag.name) === true) {
          const temp = [...filterCountry];
          const temp2 = [...filterCountryId];

          const tagIndex = temp.findIndex((item) => {
            return item === tag.name;
          });
          temp.splice(tagIndex, 1);
          temp2.splice(tagIndex, 1);
          setFilterCountry(temp);
          setFilterCountryId(temp2);
        } else {
          const temp = [...filterCountry];
          const temp2 = [...filterCountryId];
          temp.push(tag.name);
          temp2.push(tag.id);
          setFilterCountry(temp);
          setFilterCountryId(temp2);
        }
      }
    } else if (tag.category_id === 2) {
      if (countryChange.includes(tag.id) === true) {
        const temp = [...countryChange];

        const tagIndex = temp.findIndex((item) => {
          return item === tag.id;
        });
        temp.splice(tagIndex, 1);
        setCountryChange(temp);
      } else {
        const temp = [...countryChange];

        temp.push(tag.id);

        setCountryChange(temp);
      }
    }
  };

  return (
    <div className="countrys">
      <p className="filter-titles">Cuisine</p>
      <div className="filters-button-container">
        {countryTag.map((tag) => {
          return (
            <Button
              key={tag.id}
              label={tag.name}
              onClick={() => handleClick(tag)}
              className={
                filterCountry.includes(tag.name) ? "selected chip" : "chip"
              }
            />
          );
        })}
      </div>
    </div>
  );
}

FilterCountry.propTypes = {
  countryTag: PropTypes.arrayOf(
    PropTypes.shape({
      category_id: PropTypes.number,
      id: PropTypes.number,
      image_url: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  countryChange: PropTypes.arrayOf(
    PropTypes.shape({
      category_id: PropTypes.number,
      id: PropTypes.number,
    })
  ).isRequired,
  setCountryChange: PropTypes.func.isRequired,
};

export default FilterCountry;
