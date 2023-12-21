// import { useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

function NavBarMobile({ setFavoriteMobileisActive }) {
  // const [isConnected, setIsConnected] = useState(false);
  // const handleConnected = () => {
  //   setIsConnected(!isConnected);
  // };

  function handleClick() {
    setFavoriteMobileisActive((current) => !current);
  }

  return (
    <div className="navBarMobile">
      <NavLink to="/browse">
        <button type="button" className="home_button">
          <img alt="home" src="./src/assets/images/home.png" />
          <p>Accueil</p>
        </button>
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
      {/* <NavLink to="/filters"> */}
      <button type="button" onClick={handleClick} className="filter_button">
        <img alt="filters" src="./src/assets/images/settings.png" />
        <p>Filtres</p>
      </button>
      {/* </NavLink> */}
      {/* <button type="button" disabled={!isConnected} className="favorite_button">
        <img alt="favorite" src="./src/assets/images/heartFill.png" />
        <p>Favoris</p>
      </button> */}
    </div>
  );
}

NavBarMobile.propTypes = {
  setFavoriteMobileisActive: PropTypes.func.isRequired,
};

export default NavBarMobile;
