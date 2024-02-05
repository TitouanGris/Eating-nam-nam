import { useContext } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import FiltersContext from "../context/FiltersContext";

function FilterCategorys({ typeTag }) {
  const { filterType, setFilterType } = useContext(FiltersContext);

  const handleClick = (tag) => {
    if (tag.category_id === 6) {
      if (filterType.includes(tag.name) === true) {
        const temp = [...filterType];
        // const temp = []; Initialisation de la variable
        // temp.push(...selectedTags); // [1, 2, 3] = > ../ => 1, 2, 3
        const tagIndex = temp.findIndex((item) => {
          return item === tag.name;
        });
        temp.splice(tagIndex, 1);
        setFilterType(temp);
      } else {
        const temp = [...filterType];
        temp.push(tag.name);
        setFilterType(temp);
      }
    }
  };

  return (
    <div className="categorys">
      <p className="filter-titles">Categories</p>
      <div className="filters-button-container">
        {typeTag.map((tag) => {
          return (
            <Button
              key={tag.id}
              label={tag.name}
              onClick={() => handleClick(tag)}
              className={
                filterType.includes(tag.name) || filterType?.includes(tag.id)
                  ? "selected chip"
                  : "chip"
              }
            />
          );
        })}
      </div>
      {/* <Button label="Bouton désactivé" disabled /> */}
    </div>
  );
}

FilterCategorys.propTypes = {
  typeTag: PropTypes.arrayOf(
    PropTypes.shape({
      category_id: PropTypes.number,
      id: PropTypes.number,
      image_url: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
};

export default FilterCategorys;
