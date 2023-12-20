import React, { useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import FiltersContext from "../context/FiltersContext";

function RecipePost() {
  const { filters, ingredients, units } = useLoaderData();
  // console.info(ingredients);
  const {
    filterCountry,
    filterDifficulty,
    filterDuration,
    filterPrice,
    filterRegime,
    filterType,
  } = useContext(FiltersContext);

  const [persons, setPersons] = useState(0);
  const [ingValue, setIngValue] = useState("");
  const [qtyValue, setQtyValue] = useState("");
  const [unitValue, setUnitValue] = useState("");
  const [sumIng, setSumIng] = useState([]);
  const [verifIng, setVerifIng] = useState(true);

  const handlePlusPersons = () => {
    setPersons(persons + 1);
  };
  const handleLessPersons = () => {
    if (persons > 0) {
      setPersons(persons - 1);
    }
  };

  const handleIngValue = (event) => {
    const { value } = event.target;
    setIngValue(value);
  };
  const handleQtyValue = (event) => {
    const { value } = event.target;
    setQtyValue(value);
  };
  const handleUnitValue = (event) => {
    const { value } = event.target;
    setUnitValue(value);
  };
  const handleSumIng = () => {
    if (!sumIng.find((ing) => ing.ingValue === ingValue)) {
      setSumIng((oldObj) => {
        return [...oldObj, { ingValue, qtyValue, unitValue }];
      });
      setIngValue("");
      setQtyValue("");
      setUnitValue("");
      return true;
    }
    setQtyValue("");
    setUnitValue("");
    setVerifIng(false);
    return false;
  };
  console.info(ingValue);
  console.info(qtyValue);
  console.info(unitValue);
  console.info(sumIng);

  const typeTag = filters.filter((tag) => tag.category_id === 6);
  const countryTag = filters.filter((tag) => tag.category_id === 2);
  const priceTag = filters.filter((tag) => tag.category_id === 1);
  const difficultyTag = filters.filter((tag) => tag.category_id === 4);
  const regimeTag = filters.filter((tag) => tag.category_id === 3);
  const durationTag = filters.filter((tag) => tag.category_id === 5);

  return (
    <div className="recipe_post">
      <div className="recipe_name">
        <p>Quel est le nom de votre recette ?</p>
        <Input
          inputType="text"
          inputId="generic_input"
          inputName="recipe_name"
          inputMinLength="0"
          inputMaxLength="80"
          inputPlaceholder="Choucroute"
        />
      </div>
      <div className="number_persons">
        <p>Pour combien de personnes ?</p>
        <Button
          label="-"
          onClick={handleLessPersons}
          className="less_button"
          disabled={false}
        />
        <p>{persons}</p>
        <Button
          label="+"
          onClick={handlePlusPersons}
          className="plus_button"
          disabled={false}
        />
      </div>
      <div className="recipe_type">
        <p>Quel type de recette ?</p>
        <div className="filters-button-container">
          {typeTag.map((tag) => {
            return (
              <Button
                key={tag.id}
                label={tag.name}
                className={
                  filterType.includes(tag.name) ? "selected chip" : "chip"
                }
              />
            );
          })}
        </div>
      </div>
      <div className="recipe_time">
        <p>Temps de préparation</p>
        <div className="filters-button-container">
          {durationTag.map((tag) => {
            return (
              <Button
                key={tag.id}
                label={tag.name}
                className={
                  filterDuration.includes(tag.name) ? "selected chip" : "chip"
                }
              />
            );
          })}
        </div>
      </div>
      <div className="recipe_price">
        <p>Prix</p>
        <div className="filters-button-container">
          {priceTag.map((tag) => {
            return (
              <Button
                key={tag.id}
                label={tag.name}
                className={
                  filterPrice.includes(tag.name) ? "selected chip" : "chip"
                }
              />
            );
          })}
        </div>
      </div>
      <div className="recipe_difficulty">
        <p>Difficulté</p>
        <div className="filters-button-container">
          {difficultyTag.map((tag) => {
            return (
              <Button
                key={tag.id}
                label={tag.name}
                className={
                  filterDifficulty.includes(tag.name) ? "selected chip" : "chip"
                }
              />
            );
          })}
        </div>
      </div>
      <div className="recipe_regime">
        <p>Dans quel régime s'inscris votre recette ?</p>
        <div className="filters-button-container">
          {regimeTag.map((tag) => {
            return (
              <Button
                key={tag.id}
                label={tag.name}
                className={
                  filterRegime.includes(tag.name) ? "selected chip" : "chip"
                }
              />
            );
          })}
        </div>
      </div>
      <div className="recipe_country">
        <p>Pays</p>
        <div className="filters-button-container">
          {countryTag.map((tag) => {
            return (
              <Button
                key={tag.id}
                label={tag.name}
                className={
                  filterCountry.includes(tag.name) ? "selected chip" : "chip"
                }
              />
            );
          })}
        </div>
      </div>
      <div className="selection-ingredients">
        <p>Quels sont les ingrédients présents dans votre recette ?</p>
        <Input
          inputType="text"
          inputPlaceholder="Entrez votre ingrédient"
          inputList="ingredientList"
          inputName="ingredientList"
          value={ingValue}
          onChange={handleIngValue}
        />
        <datalist id="ingredientList">
          {ingredients.map((ingredient) => {
            return (
              <option key={ingredient.id} value={ingredient.name}>
                {ingredient.name}
              </option>
            );
          })}
        </datalist>
        <Input
          inputName="quantity"
          inputType="number"
          inputPlaceholder="Quantité"
          value={qtyValue}
          onChange={handleQtyValue}
        />
        <select onChange={handleUnitValue} value={unitValue}>
          <option value=""> --- </option>
          {units.map((unit) => {
            return (
              <option key={unit.id} value={unit.name}>
                {unit.name}
              </option>
            );
          })}
        </select>
        <Button
          className="add-ingredient"
          onClick={handleSumIng}
          label="+"
          disabled={ingValue === "" || unitValue === "" || qtyValue === ""}
        />
        {verifIng === false && <p>⚠️ Ingrédient déjà ajouté</p>}
        <div className="ingListSummary">
          {sumIng.map((ing) => {
            return (
              <p>
                {ing.qtyValue} {ing.unitValue} {ing.ingValue}
              </p>
            );
          })}
        </div>
      </div>
      <div className="recipe-steps">
        <p>Etapes de la recette</p>
        <textarea
          name="steps"
          placeholder="Décrivez les étapes de votre recette"
          minLength="1"
          cols="40"
          rows="8"
        />
      </div>
    </div>
  );
}

export const loadIngredientsData = async () => {
  try {
    const ingredientsData = await fetch(`http://localhost:3310/api/ingredient`);
    const data = await ingredientsData.json();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const loadUnitsData = async () => {
  try {
    const unitsData = await fetch(`http://localhost:3310/api/unit`);
    const data = await unitsData.json();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default RecipePost;
