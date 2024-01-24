const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const tables = require("../tables");

// todo : ajouter next pour le validator

const login = async (req, res) => {
  try {
    const user = await tables.user.getByMail(req.body.inputEmail); // permet d'appeler un model qui va interroger la BDD pour sortir les infos du users via son adresse e-mail

    if (user === null) {
      res.sendStatus(422);
      return;
    }

    const verfied = await argon2.verify(
      user.hashed_password,
      req.body.inputPassword
    );

    if (verfied) {
      delete user.hashed_password;

      const token = await jwt.sign(
        { sub: user.id, isAdmin: user.is_admin },
        process.env.APP_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).send({ token, user }); // todo : check if pas de MDP en front
    } else {
      res.status(422).send("incorrect email or password");
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = { login };
