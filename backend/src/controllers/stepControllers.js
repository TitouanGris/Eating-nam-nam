// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const step = await tables.step.readAll();

    // Respond with the items in JSON format
    res.json(step);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const step = await tables.step.read(req.params.id);
    if (step == null) {
      res.sendStatus(404);
    } else {
      res.json(step);
    }
  } catch (err) {
    next(err);
  }
};

const readSteps = async (req, res, next) => {
  try {
    const step = await tables.step.readSteps(req.params.id);
    if (step == null) {
      res.sendStatus(404);
    } else {
      res.json(step);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const step = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.item.create(step);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  readSteps,
  // edit,
  add,
  // destroy,
};
