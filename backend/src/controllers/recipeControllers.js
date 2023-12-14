// Import access to database tables
// const console = require("console");
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
        finalTable.push(tempObject);
        tempObject = {};
      }

      if (!tempObject.recipeId) {
        tempObject = {
          recipeId: e.recipeId,
          recipeName: e.recipeName,
          recipeImage: e.photo_url, // Assurez-vous que la colonne photo_url existe dans vos résultats SQL
          recipeServing: e.nb_serving,
          tagPrice: e.tagName,
        };
      } else if (actualId === previousId && !tempObject.tagCountry) {
        tempObject.tagCountry = e.tagName;
      } else if (actualId === previousId && !tempObject.tagRegime) {
        tempObject.tagRegime = e.tagName;
      } else if (actualId === previousId && !tempObject.tagDifficulty) {
        tempObject.tagDifficulty = e.tagName;
      } else if (actualId === previousId && !tempObject.tagDuration) {
        tempObject.tagDuration = e.tagName;
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

module.exports = {
  browse,
};
