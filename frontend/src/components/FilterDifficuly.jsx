import { useContext } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import FiltersContext from "../context/FiltersContext";

function FilterDifficuly({ difficultyTag }) {
  const {
    filterDifficulty,
    setFilterDifficulty,
    filterDifficultyId,
    setFilterDifficultyId,
  } = useContext(FiltersContext);
  const handleClick = (tag) => {
    if (tag.category_id === 4) {
      if (filterDifficulty.includes(tag.name) === true) {
        const temp = [...filterDifficulty];
        const temp2 = [...filterDifficultyId];

        const tagIndex = temp.findIndex((item) => {
          return item === tag.name;
        });
        temp.splice(tagIndex, 1);
        temp2.splice(tagIndex, 1);
        setFilterDifficulty(temp);
        setFilterDifficultyId(temp2);
      } else {
        const temp = [...filterDifficulty];
        const temp2 = [...filterDifficultyId];
        temp.push(tag.name);
        temp2.push(tag.id);
        setFilterDifficulty(temp);
        setFilterDifficultyId(temp2);
      }
    }
  };

  return (
    <div className="difficulties">
      <p className="filter-titles">Difficulté</p>
      <div className="filters-button-container">
        {difficultyTag.map((tag) => {
          return (
            <Button
              key={tag.id}
              label={
                filterDifficulty.includes(tag.name) ? (
                  <img
                    src={`http://localhost:3310/images/chef${tag.id}active.png`}
                    alt={`Difficulté ${tag.id}`}
                  />
                ) : (
                  <img
                    src={`http://localhost:3310/images/chef${tag.id}.png`}
                    alt={`Difficulté ${tag.id - 14}`}
                  />
                )
              }
              onClick={() => handleClick(tag)}
              className={
                filterDifficulty.includes(tag.name) ? "selected chip" : "chip"
              }
            />
          );
        })}
      </div>
    </div>
  );
}

FilterDifficuly.propTypes = {
  difficultyTag: PropTypes.arrayOf(
    PropTypes.shape({
      category_id: PropTypes.number,
      id: PropTypes.number,
      image_url: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
};

export default FilterDifficuly;
