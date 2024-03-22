import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import Input from "../components/Input";
import Button from "../components/Button";
import PostModal from "../components/PostModal";
import { useUser } from "../context/UserContext";

function RecipePost() {
  const { filters, ingredients, units } = useLoaderData();
  const { userInfos } = useUser();

  const [persons, setPersons] = useState(0);
  const [ingValue, setIngValue] = useState("");
  const [qtyValue, setQtyValue] = useState("");
  const [unitValue, setUnitValue] = useState("");
  const [sumIng, setSumIng] = useState([]);
  const [selectedIng, setSelectedIng] = useState([]);
  const [verifIng, setVerifIng] = useState(true);
  const [postModal, setPostModal] = useState(false);
  const [file, setFile] = useState(undefined);
  const [textareaContent, setTextareaContent] = useState("");
  const [previewURL, setPreviewURL] = useState(null);
  const [toPostRecipe, setToPostRecipe] = useState({
    recipe_name: "",
    user_id: userInfos.id,
    summary: "",
    nb_serving: persons,
    validateRecipe: false,
    photoUrl: file,
  });
  const [toPostTags, setToPostTags] = useState({
    type_tags_id: null,
    time_tags_id: null,
    price_tags_id: null,
    diff_tags_id: null,
    regime_tags_id: null,
    country_tags_id: null,
  });
  const [toPostSteps, setToPostSteps] = useState([]);
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
  const handleTextareaChange = (event) => {
    setTextareaContent(event.target.value);
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
      if (oldObj.regime_tags_id && oldObj.regime_tags_id.includes(value)) {
        const updatedTags = oldObj.regime_tags_id.filter((id) => id !== value);
        const newRegimeTags = updatedTags.length > 0 ? updatedTags : null;
        return { ...oldObj, regime_tags_id: newRegimeTags };
      }
      const newRegimeTags = oldObj.regime_tags_id
        ? [...oldObj.regime_tags_id, value]
        : [value];
      return { ...oldObj, regime_tags_id: newRegimeTags };
    });
  };
  const handleRecipeCountryTags = (tag) => {
    const value = tag.id;
    setToPostTags((oldObj) => {
      return { ...oldObj, country_tags_id: value };
    });
  };
  const handleRecipeStep = () => {
    const newStep = {
      description: textareaContent,
      step_number: toPostSteps.length + 1,
    };
    setToPostSteps([...toPostSteps, newStep]);
    setTextareaContent("");
  };
  const handleDeleteStep = (stepNumber) => {
    const updatedSteps = toPostSteps.filter(
      (step) => step.step_number !== stepNumber
    );
    const updatedStepsWithCorrectNumbers = updatedSteps.map((step, index) => ({
      ...step,
      step_number: index + 1,
    }));
    setToPostSteps(updatedStepsWithCorrectNumbers);
  };
  const typeTag = filters.filter((tag) => tag.category_id === 6);
  const countryTag = filters.filter((tag) => tag.category_id === 2);
  const priceTag = filters.filter((tag) => tag.category_id === 1);
  const difficultyTag = filters.filter((tag) => tag.category_id === 4);
  const regimeTag = filters.filter((tag) => tag.category_id === 3);
  const durationTag = filters.filter((tag) => tag.category_id === 5);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewURL(URL.createObjectURL(selectedFile));
  };
  const handleShareRecipe = async () => {
    try {
      const formData = new FormData();
      formData.append("recipe", JSON.stringify(toPostRecipe));
      formData.append("tags", JSON.stringify(toPostTags));
      formData.append("steps", JSON.stringify(toPostSteps));
      formData.append("ingredients", JSON.stringify(sumIng));
      formData.append("image", file);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipe`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        console.info("Recette partagée avec succès !");
        setToPostRecipe({
          recipe_name: "",
          user_id: 1,
          summary: "",
          nb_serving: persons,
          validateRecipe: false,
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
        setToPostSteps([]);
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
          validateRecipe: false,
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
        setToPostSteps([]);
        setSumIng([]);
      }
    } catch (error) {
      console.error("Erreur inattendue lors du partage de la recette :", error);
      setToPostRecipe({
        recipe_name: "",
        user_id: 1,
        summary: "",
        nb_serving: persons,
        validateRecipe: false,
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
      setToPostSteps([]);
      setSumIng([]);
      setSelectedIng([]);
    }
  };
  return (
    <div className="recipe_post">
      <div className="post_left">
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
          <div className="counter">
            <div className="less">
              {" "}
              <Button
                label="-"
                onClick={handleLessPersons}
                className="serving_button"
                disabled={false}
              />
            </div>
            <p>{persons} personnes</p>
            <div className="plus">
              {" "}
              <Button
                label="+"
                onClick={handlePlusPersons}
                className="serving_button"
                disabled={false}
              />
            </div>
          </div>
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
                    toPostTags.type_tags_id === tag.id
                      ? "selected chip"
                      : "chip"
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
                    toPostTags.time_tags_id === tag.id
                      ? "selected chip"
                      : "chip"
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
          <p>Prix *</p>
          <div className="filters-button-segmented-container">
            {priceTag.map((tag) => {
              return (
                <Button
                  key={tag.id}
                  label={tag.name}
                  className={
                    toPostTags.price_tags_id === tag.id
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
                    toPostTags.diff_tags_id === tag.id
                      ? "selected chip"
                      : "chip"
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
                    toPostTags.regime_tags_id &&
                    toPostTags.regime_tags_id.includes(tag.id)
                      ? "selected chip"
                      : "chip"
                  }
                  onClick={() => {
                    handleRecipeRegimeTags(tag);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="post_right">
        <div className="recipe_country">
          <p>Pays</p>
          <div className="filters-button-container">
            {countryTag.map((tag) => {
              return (
                <Button
                  key={tag.id}
                  label={tag.name}
                  className={
                    toPostTags.country_tags_id === tag.id
                      ? "selected chip"
                      : "chip"
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
          <div className="handleAddIng">
            <div className="ingInput0">
              <Input
                className="ingInput1"
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
                className="ingInput2"
                inputName="quantity"
                inputType="number"
                inputPlaceholder="Quantité"
                value={qtyValue}
                onChange={handleQtyValue}
              />
              <div className="ingI3Button">
                <select
                  onChange={handleUnitValue}
                  value={unitValue}
                  className="ingInput3"
                >
                  <option value=""> --- </option>
                  {units.map((unit) => {
                    return (
                      <option key={unit.id} value={unit.name}>
                        {unit.name}
                      </option>
                    );
                  })}
                </select>{" "}
                <Button
                  className="add-ingredient"
                  onClick={handleSumIng}
                  label="+"
                  disabled={
                    ingValue === "" || unitValue === "" || qtyValue === ""
                  }
                />
              </div>
              {verifIng === false && (
                <p className="errorIng">
                  ⚠️ L'ingrédient sélectionné n'est pas présent dans la liste ou
                  a déja été ajouté
                </p>
              )}
            </div>
          </div>
          <div className="ingListSummary">
            {selectedIng.map((ing, index) => {
              return (
                <div className="list" key={ing.ingValue}>
                  <p>
                    {ing.qtyValue}{" "}
                    {ing.unitValue === "unité" ? "" : ing.unitValue}{" "}
                    {ing.qtyValue !== 1 && ing.unitValue === "unité"
                      ? `${ing.ingValue}s`
                      : ing.ingValue}
                  </p>
                  <Button
                    label="✖️"
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
          <ul>
            {toPostSteps.map((step) => (
              <li key={step.step_number}>
                Étape {step.step_number} - {step.description}
                <button
                  type="button"
                  onClick={() => handleDeleteStep(step.step_number)}
                >
                  ✖️
                </button>
              </li>
            ))}
          </ul>
          <textarea
            name="step"
            placeholder="Décrivez les étapes de votre recette"
            minLength="1"
            cols="40"
            rows="8"
            value={textareaContent}
            onChange={handleTextareaChange}
          />
          <button type="button" onClick={handleRecipeStep}>
            Ajoutez l'étape
          </button>
          {/* {toPostSteps.map((step, index) => (
            <div className="recapSteps">
              <p>{`Étape ${step.step_number}: ${step.description}`}</p>
              <button type="button" onClick={() => handleDeleteStep(index)}>
                Supprimer
              </button>
            </div>
          ))} */}
        </div>
        <div className="uploadFile">
          <p>Photo</p>
          <input
            id="photoUpload"
            type="file"
            onChange={handleFileChange}
            accept="image/jpeg, image/jpg, image/png"
          />
          <label htmlFor="photoUpload" className="uploadInput">
            <div className="uploadBox">
              {previewURL ? (
                <img
                  className="uploadedPic"
                  src={previewURL}
                  alt="Pic preview"
                />
              ) : (
                <img
                  className="placeholderPic"
                  src="/icons8-camera-100.png"
                  alt="Choose a pic"
                />
              )}
            </div>
          </label>
        </div>
        <div className="shareContainer">
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
              sumIng.length === 0 ||
              toPostSteps.length === 0
            }
            onClick={handleShareRecipe}
          />
          {postModal && <PostModal />}
        </div>
      </div>
    </div>
  );
}

export const loadIngredientsData = async () => {
  try {
    const ingredientsData = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/ingredient`
    );
    const data = await ingredientsData.json();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const loadUnitsData = async () => {
  try {
    const unitsData = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/unit`
    );
    const data = await unitsData.json();

    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default RecipePost;
