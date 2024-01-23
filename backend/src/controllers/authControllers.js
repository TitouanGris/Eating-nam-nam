const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../tables");

// todo : ajouter next pour le validator

const login = async (req, res, next) => {
  const user = await tables.user.getByMail(req.body.inputEmail); // permet d'appeler un model qui va interroger la BDD pour sortir les infos du users via son adresse e-mail
  try {
    if (user === null) {
      // rappel : le ? permet de couvrir le cas de undefined
      // on compare le password de la BDD de notre user avec celui du front
      res.status(422);
      return;
    }
    const verified = await argon2.verify(
      user.hashed_password,
      req.body.inputPassword
    );

    if (verified) {
      delete user.hashed_password;

      const token = await jwt.sign(
        { sub: user.id, isAdmin: user.is_admin },
        process.env.APP_SECRET,
        { expiresIn: "1h" }
      );

      res.send({ user, token });
    } else {
      res.status(400).send("incorrect email or password");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { login };
