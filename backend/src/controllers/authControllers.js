const argon2 = require("argon2");
const tables = require("../tables");

// todo : ajouter next pour le validator

const login = async (req, res) => {
  const user = await tables.user.getByMail(req.body.inputEmail); // permet d'appeler un model qui va interroger la BDD pour sortir les infos du users via son adresse e-mail
  if (user == null) {
    res.sendStatus(422);
    return;
  }

  const verified = await argon2.verify(user.password, req.body.inputPassword);

  if (verified) {
    delete user.password;

    res.json(user);
  } else {
    res.sendStatus(422);
  }
};

module.exports = { login };
