import { useContext } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "./Button";
import FiltersContext from "../context/FiltersContext";

function FilterRegime({ regimeTag, setRegimeChange, regimeChange }) {
  const { filterRegime, setFilterRegime, filterRegimeId, setFilterRegimeId } =
    useContext(FiltersContext);

  const location = useLocation();

  const handleClick = (tag) => {
    if (location.pathname === "/" || location.pathname === "/browse") {
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
    } else if (tag.category_id === 3) {
      if (regimeChange.includes(tag.id) === true) {
        const temp = [...regimeChange];

        const tagIndex = temp.findIndex((item) => {
          return item === tag.id;
        });
        temp.splice(tagIndex, 1);
        setRegimeChange(temp);
      } else {
        const temp = [...regimeChange];

        temp.push(tag.id);

        setRegimeChange(temp);
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
              onClick={() => {
                handleClick(tag);
              }}
              className={
                filterRegime.includes(tag.name) || regimeChange.includes(tag.id)
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

FilterRegime.propTypes = {
  regimeTag: PropTypes.arrayOf(
    PropTypes.shape({
      category_id: PropTypes.number,
      id: PropTypes.number,
      image_url: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  regimeChange: PropTypes.arrayOf(
    PropTypes.shape({
      category_id: PropTypes.number,
      id: PropTypes.number,
    })
  ).isRequired,
  setRegimeChange: PropTypes.func.isRequired,
};

export default FilterRegime;
