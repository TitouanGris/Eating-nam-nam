import { useState } from "react";

function NavBar() {
  const [isConnected, setIsConnected] = useState(false);
  const handleConnected = () => {
    setIsConnected(!isConnected);
  };

  return (
    <div className="NavBar">
      <button type="button" className="home_button">
        <p>Accueil</p>
      </button>
      <button type="button" disabled={!isConnected} className="publish_button">
        <p>Publier</p>
      </button>
      <button
        type="button"
        className={`account${isConnected ? "_connected" : ""}`}
        onClick={handleConnected}
      >
        <p>{isConnected === false ? "Créer un compte" : "Profil"}</p>
      </button>
      <button type="button" className="filter_button">
        <p>Filtres</p>
      </button>
      <button type="button" disabled={!isConnected} className="favorite_button">
        <p>Favoris</p>
      </button>
    </div>
  );
}

export default NavBar;
