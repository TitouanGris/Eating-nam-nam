// Import access to database tables

const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const recipes = await tables.recipe.readAllCardInfos();

    let tempObject = {};
    let previousId = 0;
    let actualId = 0;
    const finalTable = [];

    recipes.forEach((e) => {
      actualId = e.recipeId;

      if (actualId !== previousId) {
        if (previousId > 0) {
          finalTable.push(tempObject);
          tempObject = {};
        }
      }

      if (!tempObject.recipeId) {
        tempObject = {
          recipeId: e.recipeId,
          recipeName: e.recipeName,
          recipeImage: e.photo_url, // Assurez-vous que la colonne photo_url existe dans vos résultats SQL
          recipeServing: e.nb_serving,
          tagPriceName: e.tagName,
          tagPriceUrl: e.tagUrl,
        };
      } else if (actualId === previousId && !tempObject.tagCountry) {
        tempObject.tagCountry = e.tagName;
        tempObject.tagCountryUrl = e.tagUrl;
      } else if (actualId === previousId && !tempObject.tagRegime) {
        tempObject.tagRegime = e.tagName;
        tempObject.tagRegimeUrl = e.tagUrl;
      } else if (actualId === previousId && !tempObject.tagDifficulty) {
        tempObject.tagDifficulty = e.tagName;
        tempObject.tagDifficultyUrl = e.tagUrl;
      } else if (actualId === previousId && !tempObject.tagDuration) {
        tempObject.tagDuration = e.tagName;
        tempObject.tagDurationUrl = e.tagUrl;
      } else if (actualId === previousId && !tempObject.tagType) {
        tempObject.tagType = e.tagName;
        tempObject.tagTypeUrl = e.tagUrl;
      }
      previousId = actualId;
    });

    // Respond with the transformed data in JSON format
    res.json(finalTable);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const recipes = await tables.recipe.readCardInfos(req.params.id);
    let tempObject = {};

    recipes.forEach((e) => {
      if (!tempObject.recipeId) {
        tempObject = {
          recipeId: e.recipeId,
          recipeName: e.recipeName,
          summary: e.summary,
          recipeImage: e.photo_url, // Assurez-vous que la colonne photo_url existe dans vos résultats SQL
          recipeServing: e.nb_serving,
          tagPriceName: e.tagName,
          tagPriceUrl: e.tagUrl,
        };
      } else if (!tempObject.tagCountry) {
        tempObject.tagCountry = e.tagName;
        tempObject.tagCountryUrl = e.tagUrl;
      } else if (!tempObject.tagRegime) {
        tempObject.tagRegime = e.tagName;
        tempObject.tagRegimeUrl = e.tagUrl;
      } else if (!tempObject.tagDifficulty) {
        tempObject.tagDifficulty = e.tagName;
        tempObject.tagDifficultyUrl = e.tagUrl;
      } else if (!tempObject.tagDuration) {
        tempObject.tagDuration = e.tagName;
        tempObject.tagDurationUrl = e.tagUrl;
      } else if (!tempObject.tagType) {
        tempObject.tagType = e.tagName;
        tempObject.tagTypeUrl = e.tagUrl;
      }
    });

    // Respond with the transformed data in JSON format
    res.json(tempObject);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const add = async (req, res, next) => {
  const { recipe, tags, ingredients, steps } = req.body;

  try {
    // Insert the recipe and associated data into the database
    const recipeResult = await tables.recipe.create({
      recipe,
      tags,
      ingredients,
      steps,
    });

    // Respond with HTTP 201 (Created) and the ID of the newly inserted recipe
    res.status(201).json({ recipeId: recipeResult.insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// const add = async (req, res, next) => {
//   // Extract the item data from the request body
//   const item = req.body;

//   try {
//     // Insert the item into the database
//     const insertId = await tables.item.create(item);

//     // Respond with HTTP 201 (Created) and the ID of the newly inserted item
//     res.status(201).json({ insertId });
//   } catch (err) {
//     // Pass any errors to the error-handling middleware
//     next(err);
//   }
// };

module.exports = {
  browse,
  read,
  add,
};
