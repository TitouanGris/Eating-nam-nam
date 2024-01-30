import { useContext } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "./Button";
import FiltersContext from "../context/FiltersContext";

function FilterPrice({ priceTag, setPriceChange, priceChange }) {
  const { filterPrice, setFilterPrice, filterPriceId, setFilterPriceId } =
    useContext(FiltersContext);

  const location = useLocation();

  const handleClick = (tag) => {
    if (location.pathname === "/" || location.pathname === "/browse") {
      if (tag.category_id === 1) {
        if (filterPrice.includes(tag.name) === true) {
          const temp = [...filterPrice];
          const temp2 = [...filterPriceId];
          const tagIndex = temp.findIndex((item) => {
            return item === tag.name;
          });
          temp.splice(tagIndex, 1);
          temp2.splice(tagIndex, 1);
          setFilterPrice(temp);
          setFilterPriceId(temp2);
        } else {
          const temp = [...filterPrice];
          const temp2 = [...filterPriceId];
          temp.push(tag.name);
          temp2.push(tag.id);
          setFilterPrice(temp);
          setFilterPriceId(temp2);
        }
      }
    } else if (tag.category_id === 1) {
      if (priceChange.includes(tag.id) === true) {
        const temp = [...priceChange];

        const tagIndex = temp.findIndex((item) => {
          return item === tag.id;
        });
        temp.splice(tagIndex, 1);
        setPriceChange(temp);
      } else {
        const temp = [...priceChange];

        temp.push(tag.id);

        setPriceChange(temp);
      }
    }
  };

  return (
    <div className="prices">
      <p className="filter-titles">Prix</p>
      <div className="filters-segmented-button-container">
        {priceTag.map((tag) => {
          return (
            <Button
              key={tag.id}
              label={tag.name}
              onClick={() => handleClick(tag)}
              className={
                filterPrice.includes(tag.name)
                  ? "selected-segmented segmented-chip"
                  : "segmented-chip"
              }
            />
          );
        })}
      </div>
    </div>
  );
}

FilterPrice.propTypes = {
  priceTag: PropTypes.arrayOf(
    PropTypes.shape({
      category_id: PropTypes.number,
      id: PropTypes.number,
      image_url: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  priceChange: PropTypes.arrayOf(
    PropTypes.shape({
      category_id: PropTypes.number,
      id: PropTypes.number,
    })
  ).isRequired,
  setPriceChange: PropTypes.func.isRequired,
};

export default FilterPrice;
