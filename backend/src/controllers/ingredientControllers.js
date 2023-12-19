const tables = require("../tables");

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
};
