import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useUser } from "../context/UserContext";

import Regime from "./Regime";

function Signin({ inscription, setInscription }) {
  const { setUserInfos } = useUser();

  const [newUser, setNewUser] = useState({
    pseudo: "",
    email: "",
    password: "",
    is_admin: false,
  });
  const [submittedUser, setSubmittedUser] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signIn, setSignIn] = useState(false);

  // state permettant de savoir quand afficher la modal de choix de préférences
  function handleSignIn() {
    setSignIn((current) => !current);
  }

  function handleClick(e) {
    e.stopPropagation();
    setInscription(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (!newUser.pseudo || !newUser.email || !newUser.password) {
      setErrorMessage("Veuillez remplir tous les champs");
    }

    if (!newUser.email.includes("@")) {
      setErrorMessage("Veuillez fournir une adresse e-mail valide");
    } else {
      try {
        await axios.post("http://localhost:3310/api/user", newUser);

        const res2 = await axios.post("http://localhost:3310/api/login", {
          // on INSERT dans la DB avec les infos saisies
          inputEmail: newUser.email,
          inputPassword: newUser.password,
        });
        setUserInfos(res2.data.user);

        setSubmittedUser([...submittedUser, newUser]);
        setNewUser({ pseudo: "", email: "", password: "" });
        setSuccessMessage(
          `Félicitations ${res2.data.user.pseudo}, votre compte a bien été créé !`
        );
        localStorage.setItem("token", res2.data.token);
        handleSignIn();
      } catch (err) {
        console.error(err);
        setErrorMessage("Cet utilisateur existe déjà.");
        // if (err.data === { error: "Cet utilisateur existe déjà." })  //todo : finir ce check pour traiter si erreur différente du server
        // setTimeout(() => setErrorMessage(""), 3000);
        setNewUser({ pseudo: "", email: "", password: "" });
      }
    }
  };
  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return inscription ? (
    <div className="inscription">
      <div className="signin-page">
        <div className="closeDiv">
          <button type="button" className="closeButton" onClick={handleClick}>
            &times;
          </button>
        </div>
        {errorMessage !== "" && (
          <div className="message">
            <p className="error">{errorMessage}</p>
          </div>
        )}
        <div className="formDiv">
          <h1>Inscription</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="pseudo"
              placeholder="Pseudo"
              value={newUser.pseudo}
              onChange={(e) =>
                setNewUser({ ...newUser, pseudo: e.target.value })
              }
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <div className="button-password">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mot de passe"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
              <button type="button" onClick={PasswordVisibility}>
                {showPassword ? "Masquer" : "Afficher"}
              </button>
            </div>

            <div className="signin-button">
              <button type="submit">Je m'inscris</button>
            </div>
          </form>
        </div>
      </div>
      {signIn && errorMessage === "" && (
        <Regime successMessage={successMessage} errorMessage={errorMessage} />
      )}
    </div>
  ) : null;
}

Signin.propTypes = {
  inscription: PropTypes.bool.isRequired,
  setInscription: PropTypes.func.isRequired,
};

export default Signin;
