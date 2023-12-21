import { useState } from "react";
import axios from "axios";

function Signin() {
  const [newUser, setNewUser] = useState({
    pseudo: "",
    email: "",
    password: "",
    is_admin: false,
  });
  const [submittedUser, setSubmittedUser] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newUser.pseudo || !newUser.email || !newUser.password) {
      console.error("Veuillez remplir tous les champs");
    }
    try {
      await axios.post("http://localhost:3310/api/user", newUser);

      setSubmittedUser([...submittedUser, newUser]);
      setNewUser({ pseudo: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signin-page">
      <h1>Inscription</h1>
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
          type="text"
          name="password"
          placeholder="Mot de passe"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <div className="signin-button">
          <button type="button">Je m'inscris</button>
        </div>
      </form>
    </div>
  );
}

export default Signin;
