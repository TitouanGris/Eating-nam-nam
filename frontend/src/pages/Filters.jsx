import { useEffect, useState, useContext } from "react";
import Button from "../components/Button";
import FiltersContext from "../context/FiltersContext";

function Filters() {
  const [filterChip, setFilterChip] = useState([]);
  const {
    filterCountry,
    setFilterCountry,
    filterDifficulty,
    setFilterDifficulty,
    filterDuration,
    setFilterDuration,
    filterPrice,
    setFilterPrice,
    filterRegime,
    setFilterRegime,
    filterType,
    setFilterType,
  } = useContext(FiltersContext);

  const handleClick = (tag) => {
    if (tag.category_id === 1) {
      if (filterPrice.includes(tag.name) === true) {
        const temp = [...filterPrice];
        // const temp = []; Initialisation de la variable
        // temp.push(...selectedTags); // [1, 2, 3] = > ../ => 1, 2, 3
        const tagIndex = temp.findIndex((item) => {
          return item === tag.name;
        });
        temp.splice(tagIndex, 1);
        setFilterPrice(temp);
      } else {
        const temp = [...filterPrice];
        temp.push(tag.name);
        setFilterPrice(temp);
      }
    } else if (tag.category_id === 2) {
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
    } else if (tag.category_id === 3) {
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
    } else if (tag.category_id === 4) {
      if (filterDifficulty.includes(tag.name) === true) {
        const temp = [...filterDifficulty];
        // const temp = []; Initialisation de la variable
        // temp.push(...selectedTags); // [1, 2, 3] = > ../ => 1, 2, 3
        const tagIndex = temp.findIndex((item) => {
          return item === tag.name;
        });
        temp.splice(tagIndex, 1);
        setFilterDifficulty(temp);
      } else {
        const temp = [...filterDifficulty];
        temp.push(tag.name);
        setFilterDifficulty(temp);
      }
    } else if (tag.category_id === 5) {
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
    } else if (tag.category_id === 6) {
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

  const resetClick = () => {
    setFilterPrice([]);
    setFilterDifficulty([]);
    setFilterDuration([]);
    setFilterRegime([]);
    setFilterCountry([]);
    setFilterType([]);
  };

  useEffect(() => {
    fetch("http://localhost:3310/api/tags")
      .then((res) => res.json())
      .then((data) => setFilterChip(data))
      .catch((err) => console.error(err));
  }, []);

  const typeTag = filterChip.filter((tag) => tag.category_id === 6);
  const countryTag = filterChip.filter((tag) => tag.category_id === 2);
  const priceTag = filterChip.filter((tag) => tag.category_id === 1);
  const difficultyTag = filterChip.filter((tag) => tag.category_id === 4);
  const regimeTag = filterChip.filter((tag) => tag.category_id === 3);
  const durationTag = filterChip.filter((tag) => tag.category_id === 5);

  return (
    <div className="filters">
      <div className="filters-header">
        <button type="button">⬅️</button>
        <p>Mes filtres</p>
        <div className="filters-button-container">
          <Button
            label="réinitialiser"
            onClick={resetClick}
            className="reset-button"
          />
        </div>
      </div>
      <div className="filters-box">
        <div className="categorys">
          <p className="filter-titles">category</p>
          <div className="filters-button-container">
            {typeTag.map((tag) => {
              return (
                <Button
                  key={tag.id}
                  label={tag.name}
                  onClick={() => handleClick(tag)}
                  className={
                    filterType.includes(tag.name) ? "selected chip" : "chip"
                  }
                />
              );
            })}
          </div>
          {/* <Button label="Bouton désactivé" disabled /> */}
        </div>
        <div className="countrys">
          <p className="filter-titles">cuisine</p>
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
        <div className="prices">
          <p className="filter-titles">prix</p>
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
        <div className="difficulties">
          <p className="filter-titles">difficulté</p>
          <div className="filters-button-container">
            {difficultyTag.map((tag) => {
              return (
                <Button
                  key={tag.id}
                  label={tag.image_url}
                  onClick={() => handleClick(tag)}
                  className={
                    filterDifficulty.includes(tag.name)
                      ? "seleccted chip"
                      : "chip"
                  }
                />
              );
            })}
          </div>
        </div>
        <div className="regimes">
          <p className="filter-titles">régime</p>
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
        <div className="durations">
          <p className="filter-titles">durée</p>
          <div className="filters-button-container">
            {durationTag.map((tag) => {
              return (
                <Button
                  key={tag.id}
                  label={tag.name}
                  onClick={() => handleClick(tag)}
                  className={
                    filterDuration.includes(tag.name) ? "selected chip" : "chip"
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Filters;
