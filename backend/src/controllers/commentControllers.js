const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const comment = await tables.comment.readAll();

    // Respond with the items in JSON format
    res.json(comment);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const readCommentsByRecipeId = async (req, res, next) => {
  try {
    const comment = await tables.comment.readCommentsByRecipeId(req.params.id);
    if (comment == null) {
      res.sendStatus(404);
    } else {
      res.json(comment);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const message = req.body;
  try {
    // Insert the comment and associated data into the database
    const commentResult = await tables.comment.create(message);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted comment
    res.status(201).json({ commentId: commentResult.insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  readCommentsByRecipeId,
  browse,
  add,
};
