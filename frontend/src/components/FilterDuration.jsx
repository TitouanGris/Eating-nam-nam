import { useContext } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import FiltersContext from "../context/FiltersContext";

function FilterDuration({ durationTag }) {
  const { filterDuration, setFilterDuration } = useContext(FiltersContext);

  const handleClick = (tag) => {
    if (tag.category_id === 5) {
      if (filterDuration.includes(tag.name) === true) {
        const temp = [...filterDuration];
        // const temp = []; Initialisation de la variable
        // temp.push(...selectedTags); // [1, 2, 3] = > ../ => 1, 2, 3
        const tagIndex = temp.findIndex((item) => {
          return item === tag.name;
        });
        temp.splice(tagIndex, 1);
        setFilterDuration(temp);
      } else {
        const temp = [...filterDuration];
        temp.push(tag.name);
        setFilterDuration(temp);
      }
    }
  };

  return (
    <div className="durations">
      <p className="filter-titles">Durée</p>
      <div className="filters-button-container">
        {durationTag.map((tag) => {
          return (
            <Button
              key={tag.id}
              label={tag.name}
              onClick={() => handleClick(tag)}
              className={
                filterDuration.includes(tag.name) ||
                filterDuration.includes(tag.id)
                  ? "selected chip"
                  : "chip"
              }
            />
          );
        })}
      </div>
    </div>
  );
}

FilterDuration.propTypes = {
  durationTag: PropTypes.arrayOf(
    PropTypes.shape({
      category_id: PropTypes.number,
      id: PropTypes.number,
      image_url: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
};

export default FilterDuration;
