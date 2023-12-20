import { useContext } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import FiltersContext from "../context/FiltersContext";

function FilterCountry({ countryTag }) {
  const { filterCountry, setFilterCountry } = useContext(FiltersContext);

  const handleClick = (tag) => {
    if (tag.category_id === 2) {
      if (filterCountry.includes(tag.name) === true) {
        const temp = [...filterCountry];
        // const temp = []; Initialisation de la variable
        // temp.push(...selectedTags); // [1, 2, 3] = > ../ => 1, 2, 3
        const tagIndex = temp.findIndex((item) => {
          return item === tag.name;
        });
        temp.splice(tagIndex, 1);
        setFilterCountry(temp);
      } else {
        const temp = [...filterCountry];
        temp.push(tag.name);
        setFilterCountry(temp);
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
