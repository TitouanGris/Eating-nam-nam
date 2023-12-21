const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const users = await tables.user.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  try {
    const { pseudo, email } = req.body;
    const existingUser = await tables.user.readOneUser(pseudo, email);
    if (existingUser) {
      return res.status((400).json({ error: "Cet utilsateur existe déjà." }));
    }
    const insertId = await tables.user.create(req.body);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
  return null;
};

module.exports = {
  browse,
  add,
};
