const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const users = await tables.user.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const getbytoken = async (req, res) => {
  const userinfo = req.auth; // correspond au payload

  try {
    if (userinfo.sub) {
      const oneUser = await tables.user.getById(userinfo.sub);

      res.status(201).json(oneUser);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal servor error");
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

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const oneUser = await tables.user.read(req.params.id);
    console.info(`oneuser: ${oneUser}`);
    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (oneUser == null) {
      res.sendStatus(404);
    } else {
      res.json(oneUser);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit = async (req, res, next) => {
  const { newUser } = req.body;
  try {
    const existingUser = await tables.user.readOneUser(newUser);
    if (existingUser) {
      const modifyId = await tables.user.edit(req.params.id, newUser);
      res.status(201).json({ modifyId });
    }
  } catch (err) {
    next(err);
    res.status(404).send("Erreur de modification du user");
  }
};

const update = async (req, res, next) => {
  const newUser = req.body;
  console.info("avatar:");
  console.info(req.body);
  try {
    const existingUser = await tables.user.readOneUser(newUser);
    if (existingUser) {
      const modifyId = await tables.user.editAvatar(req.params.id, newUser);
      res.status(201).json({ modifyId });
    }
  } catch (err) {
    next(err);
    res.status(404).send("Erreur de modification du user");
  }
};

const destroy = async (req, res, next) => {
  try {
    // const { pseudo, email } = req.body;
    // const deleteUser = await tables.user.destroy(pseudo, email);
    // if (!deleteUser) {
    //   return res.status((404).json({ error: "Cet utilsateur n'existe pas." }));
    // }
    const deleteId = await tables.user.destroy(req.params.id);
    res.status(201).json({ deleteId });
  } catch (err) {
    next(err);
  }
  return null;
};

module.exports = {
  browse,
  read,
  add,
  edit,
  update,
  destroy,
  getbytoken,
};
