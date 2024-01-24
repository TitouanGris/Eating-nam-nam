const tables = require("../tables");

const add = async (req, res, next) => {
  const { userInfosId, filterIdChosenReduced } = req.body;

  const newTable = filterIdChosenReduced.map(
    (reg) => `(${userInfosId}, ${reg})`
  );
  newTable.join(",");

  try {
    const result = await tables.user_tags.add(newTable);

    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
  return null;
};

const browse = async (req, res, next) => {
  try {
    const result = await tables.user_tags.browse(req.params.id);
    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
  return null;
};

const update = async (req, res, next) => {
  try {
    const { userId, newTags } = req.body;
    // Supprimer les anciennes préférences du user
    await tables.user_tags.delete(userId, newTags);
    // Ajouter les nouvelles préférences
    await tables.user_tags.add(newTags);
    res.status(201).json({ message: "Préférences mises à jour avec succès." });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { userInfosId, filterIdChosenReduced } = req.body;

  const newTable = filterIdChosenReduced.map(
    (reg) => `(${userInfosId}, ${reg})`
  );
  const values = newTable.join(",");

  try {
    const result = await tables.user_tags.delete(values);

    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
  return null;
};

module.exports = {
  add,
  browse,
  destroy,
  update,
};
