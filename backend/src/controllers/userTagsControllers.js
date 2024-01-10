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

const destroy = async (req, res, next) => {
  try {
    const { userId, tagsId } = req.body;
    const deleteTag = await tables.user_tags.delete({ userId, tagsId });
    if (!deleteTag) {
      return res.status(404).json({ error: "Ce tag n'existe pas." });
    }
    res.status(201).json({ deleteTag });
  } catch (err) {
    next(err);
  }
  return null;
};

module.exports = {
  add,
  browse,
  destroy,
};
