// import { useState } from "react";
import { NavLink } from "react-router-dom";

function NavBarDesktop() {
  // const [isConnected, setIsConnected] = useState(false);
  // const handleConnected = () => {
  //   setIsConnected(!isConnected);
  // };

  return (
    <div className="navBarDesktop">
      <div className="logo">
        <img src="/src/assets/images/logo.png" alt="" />
      </div>
      <div className="lien">
        <NavLink to="/browse">
          <p>Accueil</p>
        </NavLink>
        {/* <button type="button" disabled={!isConnected} className="publish_button">
        <img alt="publish" src="./src/assets/images/add.png" />
        <p>Publier</p>
      </button> */}
        {/* <button
        type="button"
        className={`account${isConnected ? "_connected" : ""}`}
        onClick={handleConnected}
      >
        <img alt="account" src="./src/assets/images/account.png" />
        <p>{isConnected === false ? "Créer un compte" : "Profil"}</p>
      </button> */}
        <NavLink to="/publish">
          <p>Publier</p>
        </NavLink>
        {/* <button type="button" disabled={!isConnected} className="favorite_button">
        <img alt="favorite" src="./src/assets/images/heartFill.png" />
        <p>Favoris</p>
      </button> */}
      </div>
    </div>
  );
}

export default NavBarDesktop;
