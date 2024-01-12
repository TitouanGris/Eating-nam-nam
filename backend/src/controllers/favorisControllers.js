const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const result = await tables.favoris.browse(req.params.id);
    const newTable = result.map((el) => el.recipe_id);

    // Respond with the items in JSON format
    res.json(newTable);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { userId, recipeId } = req.body;
  try {
    const result = await tables.favoris.delete(userId, recipeId);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  const { userId, recipeId } = req.body;
  try {
    // Insert the comment and associated data into the database
    const result = await tables.favoris.create(userId, recipeId);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted comment
    res.status(201).json(result);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  browse,
  add,
  destroy,
};
