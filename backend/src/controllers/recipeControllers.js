// Import access to database tables

const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const recipes = await tables.recipe.readAllCardInfos();

    const recipesArray = [];

    let recipeTemp = {};

    recipes.forEach((recipe) => {
      const foundIndex = recipesArray.findIndex(
        (r) => r.recipeId.toString() === recipe.recipeId.toString()
      );

      if (foundIndex >= 0) {
        if (recipesArray[foundIndex][recipe.categoryName] !== undefined) {
          recipesArray[foundIndex][recipe.categoryName].push({
            tagName: recipe.tagName,
            tagUrl: recipe.tagUrl,
          });
        } else {
          recipesArray[foundIndex][recipe.categoryName] = [];
          recipesArray[foundIndex][recipe.categoryName].push({
            tagName: recipe.tagName,
            tagUrl: recipe.tagUrl,
          });
        }
      } else {
        recipeTemp = { ...recipe };
        recipeTemp.recipeImage = recipe.photo_url;
        recipeTemp.recipeServing = recipe.nb_serving;

        recipeTemp[recipe.categoryName] = [];
        recipeTemp[recipe.categoryName].push({
          tagName: recipe.tagName,
          tagUrl: recipe.tagUrl,
        });

        delete recipeTemp.categoryName;
        delete recipeTemp.photo_url;
        delete recipeTemp.nb_serving;
        recipesArray.push(recipeTemp);
      }
    });

    res.status(200).json(recipesArray);
  } catch (err) {
    next(err);
  }
};

const adminBrowse = async (req, res, next) => {
  try {
    const recipes = await tables.recipe.readAllPendingRecipes();

    res.status(200).json(recipes);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const recipes = await tables.recipe.readCardInfos(req.params.id);

    const recipesArray = [];

    let recipeTemp = {};

    recipes.forEach((recipe) => {
      const foundIndex = recipesArray.findIndex(
        (r) => r.recipeId.toString() === recipe.recipeId.toString()
      );

      if (foundIndex >= 0) {
        if (recipesArray[foundIndex][recipe.categoryName] !== undefined) {
          recipesArray[foundIndex][recipe.categoryName].push({
            tagName: recipe.tagName,
            tagUrl: recipe.tagUrl,
          });
        } else {
          recipesArray[foundIndex][recipe.categoryName] = [];
          recipesArray[foundIndex][recipe.categoryName].push({
            tagName: recipe.tagName,
            tagUrl: recipe.tagUrl,
          });
        }
      } else {
        recipeTemp = { ...recipe };
        recipeTemp.recipeImage = recipe.photo_url;
        recipeTemp.recipeServing = recipe.nb_serving;

        recipeTemp[recipe.categoryName] = [];
        recipeTemp[recipe.categoryName].push({
          tagName: recipe.tagName,
          tagUrl: recipe.tagUrl,
        });

        delete recipeTemp.categoryName;
        delete recipeTemp.photo_url;
        delete recipeTemp.nb_serving;
        recipesArray.push(recipeTemp);
      }
    });

    res.status(200).json(recipesArray);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const { recipe, tags, ingredients, steps, url } = req.body;
  try {
    const insertId = await tables.recipe.create({
      recipe: JSON.parse(recipe),
      tags: JSON.parse(tags),
      ingredients: JSON.parse(ingredients),
      steps: JSON.parse(steps),
      recipeImage: `/images/${url}`,
    });

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  adminBrowse,
  read,
  add,
};
