const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const avatars = await tables.avatar.readAll();
    res.json(avatars);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  // uniquement un admin peut accéder au controlleur d'ajout d'avatar
  if (!req.auth.isAdmin) {
    res.sendStatus(403);
  }
  try {
    const { url } = req.body;
    // TODO : à adapter pour vérif si image existe déjà dans la base
    const existingAvatar = await tables.avatar.readOneAvatar(url);
    if (existingAvatar) {
      res.status((400).json({ error: "Cette image existe déjà" }));
    }
    const insertId = await tables.avatar.create(url);
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
