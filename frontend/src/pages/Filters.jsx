import { useEffect, useState } from "react";
import Button from "../components/Button";

function Filters() {
  const [filterChip, setFilterChip] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleClick = (id) => {
    if (selectedTags.includes(id) === true) {
      console.info(selectedTags);
      const temp = [...selectedTags];
      // const temp = []; Initialisation de la variable
      // temp.push(...selectedTags); // [1, 2, 3] = > ../ => 1, 2, 3
      const tagIndex = temp.findIndex((item) => {
        return item === id;
      });
      temp.splice(tagIndex, 1);
      setSelectedTags(temp);
      console.info("Bouton True !", id);
    } else {
      const temp = [...selectedTags];
      temp.push(id);
      setSelectedTags(temp);
      console.info("Bouton false !", id);
    }
  };
  console.info(selectedTags);

  const resetClick = () => {
    setSelectedTags([]);
  };

  useEffect(() => {
    fetch("http://localhost:3310/api/tags")
      .then((res) => res.json())
      .then((data) => setFilterChip(data))
      .catch((err) => console.error(err));
  }, []);
  console.info(filterChip);

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
                  onClick={() => handleClick(tag.id)}
                  className={
                    selectedTags.includes(tag.id) ? "selected chip" : "chip"
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
                  onClick={() => handleClick(tag.id)}
                  className={
                    selectedTags.includes(tag.id) ? "selected chip" : "chip"
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
                  onClick={() => handleClick(tag.id)}
                  className={
                    selectedTags.includes(tag.id)
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
                  onClick={() => handleClick(tag.id)}
                  className={
                    selectedTags.includes(tag.id) ? "seleccted chip" : "chip"
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
                  onClick={() => handleClick(tag.id)}
                  className={
                    selectedTags.includes(tag.id) ? "selected chip" : "chip"
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
                  onClick={() => handleClick(tag.id)}
                  className={
                    selectedTags.includes(tag.id) ? "selected chip" : "chip"
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
