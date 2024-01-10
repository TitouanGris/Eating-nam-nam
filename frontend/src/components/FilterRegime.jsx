import { useContext } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import FiltersContext from "../context/FiltersContext";

function FilterRegime({ regimeTag }) {
  const { filterRegime, setFilterRegime, filterRegimeId, setFilterRegimeId } =
    useContext(FiltersContext);
  const handleClick = (tag) => {
    if (tag.category_id === 3) {
      if (filterRegime.includes(tag.name) === true) {
        const temp = [...filterRegime];
        const temp2 = [...filterRegimeId];

        const tagIndex = temp.findIndex((item) => {
          return item === tag.name;
        });
        temp.splice(tagIndex, 1);
        temp2.splice(tagIndex, 1);
        setFilterRegime(temp);
        setFilterRegimeId(temp2);
      } else {
        const temp = [...filterRegime];
        const temp2 = [...filterRegimeId];
        temp.push(tag.name);
        temp2.push(tag.id);
        setFilterRegime(temp);
        setFilterRegimeId(temp2);
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
