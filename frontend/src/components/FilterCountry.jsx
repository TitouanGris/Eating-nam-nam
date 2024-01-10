import { useContext } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import FiltersContext from "../context/FiltersContext";

function FilterCountry({ countryTag }) {
  const {
    filterCountry,
    setFilterCountry,
    filterCountryId,
    setFilterCountryId,
  } = useContext(FiltersContext);

  const handleClick = (tag) => {
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
};

export default FilterCountry;
