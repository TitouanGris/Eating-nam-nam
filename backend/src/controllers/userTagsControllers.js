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
};

const browse = async (req, res, next) => {
  try {
    const result = await tables.user_tags.browse(req.params.id);

    // const newTable = result.map((item) => {
    //   return item.name;
    // });

    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  add,
  browse,
};
