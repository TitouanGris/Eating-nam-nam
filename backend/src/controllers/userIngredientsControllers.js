const tables = require("../tables");

const add = async (req, res, next) => {
  const { userInfosId, ingSelected } = req.body;

  const newTable = ingSelected.map((ing) => `(${userInfosId}, ${ing})`);
  newTable.join(",");

  try {
    const result = await tables.user_ingredient.add(newTable);

    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  add,
};
