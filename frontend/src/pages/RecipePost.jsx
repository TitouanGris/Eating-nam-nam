import React, { useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import FiltersContext from "../context/FiltersContext";
import PostModal from "../components/PostModal";

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
  const [selectedIng, setSelectedIng] = useState([]);
  const [verifIng, setVerifIng] = useState(true);
  const [postModal, setPostModal] = useState(false);
  const [toPostRecipe, setToPostRecipe] = useState({
    recipe_name: "",
    user_id: 1,
    summary: "",
    nb_serving: persons,
    validateRecipe: true,
    photoUrl: null,
  });
  const [toPostTags, setToPostTags] = useState({
    type_tags_id: null,
    time_tags_id: null,
    price_tags_id: null,
    diff_tags_id: null,
    regime_tags_id: null,
    country_tags_id: null,
  });
  const [toPostSteps, setToPostSteps] = useState({
    description: "",
    step_number: 1,
  });

  const handlePlusPersons = () => {
    setPersons((prevPersons) => prevPersons + 1);
    setToPostRecipe((oldObj) => {
      return { ...oldObj, nb_serving: persons + 1 };
    });
  };
  const handleLessPersons = () => {
    if (persons > 0) {
      setPersons((prevPersons) => prevPersons - 1);
      setToPostRecipe((oldObj) => {
        return { ...oldObj, nb_serving: persons - 1 };
      });
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
    if (
      !ingredients?.name &&
      !selectedIng.find((ing) => ing.ingValue === ingValue) &&
      ingredients.find((ingredient) => ingredient.name === ingValue)
    ) {
      const catId = ingredients?.find(
        (ingredient) => ingredient.name === ingValue
      ).id;
      const unitId = units?.find((unit) => unit.name === unitValue).id;
      setSumIng((oldObj) => {
        return [...oldObj, { catId, qtyValue, unitId }];
      });
      setSelectedIng((oldObj) => {
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
  const handleRemove = (index) => {
    setSumIng((oldObj) => {
      const updateSumIng = [...oldObj];
      updateSumIng.splice(index, 1);
      return updateSumIng;
    });
    setSelectedIng((oldObj) => {
      const updateSelectedIng = [...oldObj];
      updateSelectedIng.splice(index, 1);
      return updateSelectedIng;
    });
  };

  const handleRecipeName = (event) => {
    const { value } = event.target;
    setToPostRecipe((oldObj) => {
      return { ...oldObj, recipe_name: value };
    });
  };
  const handleRecipeSummary = (event) => {
    const { value } = event.target;
    setToPostRecipe((oldObj) => {
      return { ...oldObj, summary: value };
    });
  };
  const handleRecipeTypeTags = (tag) => {
    const value = tag.id;
    setToPostTags((oldObj) => {
      return { ...oldObj, type_tags_id: value };
    });
  };
  const handleRecipeTimeTags = (tag) => {
    const value = tag.id;
    setToPostTags((oldObj) => {
      return { ...oldObj, time_tags_id: value };
    });
  };
  const handleRecipePriceTags = (tag) => {
    const value = tag.id;
    setToPostTags((oldObj) => {
      return { ...oldObj, price_tags_id: value };
    });
  };
  const handleRecipeDiffTags = (tag) => {
    const value = tag.id;
    setToPostTags((oldObj) => {
      return { ...oldObj, diff_tags_id: value };
    });
  };
  const handleRecipeRegimeTags = (tag) => {
    const value = tag.id;
    setToPostTags((oldObj) => {
      return { ...oldObj, regime_tags_id: value };
    });
  };
  const handleRecipeCountryTags = (tag) => {
    const value = tag.id;
    setToPostTags((oldObj) => {
      return { ...oldObj, country_tags_id: value };
    });
  };
  const handleRecipeStep = (event) => {
    const { value } = event.target;
    setToPostSteps((oldObj) => {
      return { ...oldObj, description: value };
    });
  };

  const typeTag = filters.filter((tag) => tag.category_id === 6);
  const countryTag = filters.filter((tag) => tag.category_id === 2);
  const priceTag = filters.filter((tag) => tag.category_id === 1);
  const difficultyTag = filters.filter((tag) => tag.category_id === 4);
  const regimeTag = filters.filter((tag) => tag.category_id === 3);
  const durationTag = filters.filter((tag) => tag.category_id === 5);

  const handleShareRecipe = async () => {
    try {
      const response = await fetch("http://localhost:3310/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipe: toPostRecipe,
          tags: toPostTags,
          steps: [toPostSteps],
          ingredients: sumIng,
        }),
      });

      if (response.ok) {
        console.info("Recette partagée avec succès !");
        setToPostRecipe({
          recipe_name: "",
          user_id: 1,
          summary: "",
          nb_serving: persons,
          validateRecipe: true,
          photoUrl: null,
        });
        setToPostTags({
          type_tags_id: null,
          time_tags_id: null,
          price_tags_id: null,
          diff_tags_id: null,
          regime_tags_id: null,
          country_tags_id: null,
        });
        setToPostSteps({
          description: "",
          step_number: 1,
        });
        setSumIng([]);
        setSelectedIng([]);
        setPostModal(true);
      } else {
        console.error(
          "Erreur lors du partage de la recette :",
          response.statusText
        );
        setToPostRecipe({
          recipe_name: "",
          user_id: 1,
          summary: "",
          nb_serving: persons,
          validateRecipe: true,
          photoUrl: null,
        });
        setToPostTags({
          type_tags_id: null,
          time_tags_id: null,
          price_tags_id: null,
          diff_tags_id: null,
          regime_tags_id: null,
          country_tags_id: null,
        });
        setToPostSteps({
          description: "",
          step_number: 1,
        });
        setSumIng([]);
      }
    } catch (error) {
      console.error("Erreur inattendue lors du partage de la recette :", error);
      setToPostRecipe({
        recipe_name: "",
        user_id: 1,
        summary: "",
        nb_serving: persons,
        validateRecipe: true,
        photoUrl: null,
      });
      setToPostTags({
        type_tags_id: null,
        time_tags_id: null,
        price_tags_id: null,
        diff_tags_id: null,
        regime_tags_id: null,
        country_tags_id: null,
      });
      setToPostSteps({
        description: "",
        step_number: 1,
      });
      setSumIng([]);
      setSelectedIng([]);
    }
  };

  return (
    <div className="recipe_post">
      <div className="recipe_name">
        <p>Quel est le nom de votre recette ? *</p>
        <Input
          inputType="text"
          inputId="generic_input"
          inputName="recipe_name"
          inputMinLength="0"
          inputMaxLength="80"
          inputPlaceholder="Choucroute"
          value={toPostRecipe.recipe_name}
          onChange={handleRecipeName}
        />
      </div>
      <div className="recipe_resume">
        <p>Décrivez en quelques mots votre recette *</p>
        <Input
          inputType="text"
          inputId="generic_input"
          inputName="recipe_resume"
          inputMinLength="0"
          inputMaxLength="255"
          inputPlaceholder="Salade fraîche pour l'été"
          size="30"
          value={toPostRecipe.summary}
          onChange={handleRecipeSummary}
        />
      </div>
      <div className="number_persons">
        <p>Pour combien de personnes ? *</p>
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
        <p>Quel type de recette ? *</p>
        <div className="filters-button-container">
          {typeTag.map((tag) => {
            return (
              <Button
                key={tag.id}
                label={tag.name}
                className={
                  filterType.includes(tag.name) ? "selected chip" : "chip"
                }
                onClick={() => {
                  handleRecipeTypeTags(tag);
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="recipe_time">
        <p>Temps de préparation *</p>
        <div className="filters-button-container">
          {durationTag.map((tag) => {
            return (
              <Button
                key={tag.id}
                label={tag.name}
                className={
                  filterDuration.includes(tag.name) ? "selected chip" : "chip"
                }
                onClick={() => {
                  handleRecipeTimeTags(tag);
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="recipe_price">
        <p>Prix</p>
        <div className="filters-button-segmented-container">
          {priceTag.map((tag) => {
            return (
              <Button
                key={tag.id}
                label={tag.name}
                className={
                  filterPrice.includes(tag.name)
                    ? "selected-segmented segemented-chip"
                    : "segmented-chip"
                }
                onClick={() => {
                  handleRecipePriceTags(tag);
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="recipe_difficulty">
        <p>Difficulté *</p>
        <div className="filters-button-container">
          {difficultyTag.map((tag) => {
            return (
              <Button
                key={tag.id}
                label={tag.name}
                className={
                  filterDifficulty.includes(tag.name) ? "selected chip" : "chip"
                }
                onClick={() => {
                  handleRecipeDiffTags(tag);
                }}
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
                onClick={() => {
                  handleRecipeRegimeTags(tag);
                }}
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
                onClick={() => {
                  handleRecipeCountryTags(tag);
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="selection-ingredients">
        <p>Quels sont les ingrédients présents dans votre recette ? *</p>
        <Input
          inputType="text"
          inputPlaceholder="Entrez votre ingrédient"
          inputList="ingredientList"
          inputName="ingredientList"
          value={ingValue}
          onChange={(event) => {
            handleIngValue(event);
            setVerifIng(true);
          }}
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
        {verifIng === false && (
          <p>
            ⚠️ L'ingrédient sélectionné n'est pas présent dans la liste ou à
            déja été ajouté
          </p>
        )}
        <div className="ingListSummary">
          {selectedIng.map((ing, index) => {
            return (
              <div key={ing.ingValue}>
                <p>
                  {ing.qtyValue} {ing.unitValue} {ing.ingValue}
                </p>
                <Button
                  label="X"
                  className="removeIng"
                  onClick={() => handleRemove(index)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="recipe-steps">
        <p>Etapes de la recette *</p>
        <textarea
          name="steps"
          placeholder="Décrivez les étapes de votre recette"
          minLength="1"
          cols="40"
          rows="8"
          onChange={handleRecipeStep}
        />
      </div>
      <Button
        className="share-recipe button1"
        label="Partagez !"
        disabled={
          toPostRecipe.recipe_name === "" ||
          toPostRecipe.summary === "" ||
          toPostRecipe.nb_serving === 0 ||
          toPostTags.type_tags_id === null ||
          toPostTags.diff_tags_id === null ||
          toPostTags.price_tags_id === null ||
          toPostTags.time_tags_id === null ||
          toPostSteps.description === "" ||
          sumIng.length === 0
        }
        onClick={handleShareRecipe}
      />
      {postModal && <PostModal />}
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
