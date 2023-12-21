const tables = require("../tables");

// todo : ajouter next pour le validator

const login = async (req, res) => {
  const user = await tables.user.getByMail(req.body.inputEmail); // permet d'appeler un model qui va interroger la BDD pour sortir les infos du users via son adresse e-mail

  const password = req.body.inputPassword; // on récupère le password fournis par le front (via méthode POST via le body)

  if (user?.password === password) {
    // rappel : le ? permet de courir le cas de undefined
    // on compare le password de la BDD de notre user avec celui du front
    res.status(200).send(user);
  } else {
    res.status(400).send("inccorect email or password");
  }
};

module.exports = { login };
