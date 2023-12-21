// import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import PropTypes from "prop-types";
import FiltersContext from "../context/FiltersContext";

function NavBarMobile({ setFavoriteMobileisActive }) {
  // const [isConnected, setIsConnected] = useState(false);
  // const handleConnected = () => {
  //   setIsConnected(!isConnected);
  // };

  const { pathname } = useLocation();
  const pagesWithoutAcceuil = ["/browse"];
  const pagesWithoutFilter = ["/publish"];

  const {
    setFilterCountry,
    setFilterDifficulty,
    setFilterDuration,
    setFilterPrice,
    setFilterRegime,
    setFilterType,
  } = useContext(FiltersContext);

  function handleClick() {
    setFavoriteMobileisActive((current) => !current);
  }

  const handlePublish = () => {
    setFilterPrice([]);
    setFilterDifficulty([]);
    setFilterDuration([]);
    setFilterRegime([]);
    setFilterCountry([]);
    setFilterType([]);
  };
  return (
    <div className="navBarMobile">
      <NavLink to="/browse">
        <button
          disabled={pagesWithoutAcceuil.includes(pathname)}
          type="button"
          className="home_button"
        >
          <img alt="home" src="./src/assets/images/home.png" />
          <p>Accueil</p>
        </button>
      </NavLink>
      <NavLink to="/publish" onClick={handlePublish}>
        <button
          type="button"
          // disabled=
          className="publish_button"
        >
          <img alt="publish" src="./src/assets/images/add.png" />
          <p>Publier</p>
        </button>
      </NavLink>
      {/* <button
        type="button"
        className={`account${isConnected ? "_connected" : ""}`}
        onClick={handleConnected}
      >
        <img alt="account" src="./src/assets/images/account.png" />
        <p>{isConnected === false ? "Créer un compte" : "Profil"}</p>
      </button> */}
      {/* <NavLink to="/filters"> */}
      <button
        type="button"
        onClick={handleClick}
        className="filter_button"
        disabled={pagesWithoutFilter.includes(pathname)}
      >
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
