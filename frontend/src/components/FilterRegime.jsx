import { useContext } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import FiltersContext from "../context/FiltersContext";

function FilterRegime({ regimeTag }) {
  const { filterRegime, setFilterRegime } = useContext(FiltersContext);
  const handleClick = (tag) => {
    if (tag.category_id === 3) {
      if (filterRegime.includes(tag.name) === true) {
        const temp = [...filterRegime];
        // const temp = []; Initialisation de la variable
        // temp.push(...selectedTags); // [1, 2, 3] = > ../ => 1, 2, 3
        const tagIndex = temp.findIndex((item) => {
          return item === tag.name;
        });
        temp.splice(tagIndex, 1);
        setFilterRegime(temp);
      } else {
        const temp = [...filterRegime];
        temp.push(tag.name);
        setFilterRegime(temp);
      }
    }
  };

  return (
    <div className="regimes">
      <p className="filter-titles">Régime</p>
      <div className="filters-button-container">
        {regimeTag.map((tag) => {
          return (
            <Button
              key={tag.id}
              label={tag.name}
              onClick={() => handleClick(tag)}
              className={
                filterRegime.includes(tag.name) ? "selected chip" : "chip"
              }
            />
          );
        })}
      </div>
    </div>
  );
}

FilterRegime.propTypes = {
  regimeTag: PropTypes.arrayOf(
    PropTypes.shape({
      category_id: PropTypes.number,
      id: PropTypes.number,
      image_url: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
};

export default FilterRegime;
