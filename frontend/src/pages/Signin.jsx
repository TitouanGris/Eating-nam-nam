import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Signin() {
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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newUser.pseudo || !newUser.email || !newUser.password) {
      setErrorMessage("Veuillez remplir tous les champs");
    }
    try {
      await axios.post("http://localhost:3310/api/user", newUser);
      const res2 = await axios.post("http://localhost:3310/api/login", {
        // on INSERT dans la DB avec les infos saisies
        inputEmail: newUser.email,
        inputPassword: newUser.password,
      });
      setUserInfos(res2.data);
      setSubmittedUser([...submittedUser, newUser]);
      setNewUser({ pseudo: "", email: "", password: "" });
      setSuccessMessage(
        `Félicitations ${res2.data.pseudo}, votre compte a bien été créé !`
      );
      setTimeout(() => {
        navigate("/browse");
      }, 2000);
    } catch (err) {
      console.error(err);
      setErrorMessage("Cet utilisateur existe déjà.");
    }
  };

  return (
    <div className="signin-page">
      <h1>Inscription</h1>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <p>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="pseudo"
          placeholder="Pseudo"
          value={newUser.pseudo}
          onChange={(e) => setNewUser({ ...newUser, pseudo: e.target.value })}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <div className="signin-button">
          <button type="submit">Je m'inscris</button>
        </div>
      </form>
    </div>
  );
}

export default Signin;
