// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const tags = await tables.tags.readAll();

    // Respond with the items in JSON format
    res.json(tags);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const readTagsByRecipeId = async (req, res, next) => {
  try {
    const tags = await tables.tags.readTagsByRecipeId(req.params.id);
    if (tags == null) {
      res.sendStatus(404);
    } else {
      res.json(tags);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  readTagsByRecipeId,
};
