const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const ingredient = await tables.ingredient.readAllIng();

    // Respond with the items in JSON format
    res.json(ingredient);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const add = async (req, res, next) => {
  const name = req.body.ingToPush;

  try {
    const ing = await tables.ingredient.create(name);

    res.sendStatus(201).json(ing);
  } catch (error) {
    next(error);
  }
};

const readIngredientsByRecipeId = async (req, res, next) => {
  try {
    const ingredient = await tables.ingredient.readIngredientsByRecipeId(
      req.params.id
    );
    if (ingredient == null) {
      res.sendStatus(404);
    } else {
      res.json(ingredient);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  readIngredientsByRecipeId,
  browse,
  add,
};
