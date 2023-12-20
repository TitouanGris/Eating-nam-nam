// import { useState } from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import FiltersContext from "../context/FiltersContext";

function NavBar() {
  // const [isConnected, setIsConnected] = useState(false);
  // const handleConnected = () => {
  //   setIsConnected(!isConnected);
  // };
  const {
    setFilterCountry,
    setFilterDifficulty,
    setFilterDuration,
    setFilterPrice,
    setFilterRegime,
    setFilterType,
  } = useContext(FiltersContext);

  const handlePublish = () => {
    setFilterPrice([]);
    setFilterDifficulty([]);
    setFilterDuration([]);
    setFilterRegime([]);
    setFilterCountry([]);
    setFilterType([]);
  };

  return (
    <div className="NavBar">
      <NavLink to="/browse">
        <button type="button" className="home_button">
          <img alt="filters" src="./src/assets/images/home.png" />
          <p>Accueil</p>
        </button>
      </NavLink>
      <NavLink to="/publish" onClick={handlePublish}>
        <button
          type="button"
          // disabled={!isConnected}
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
      <NavLink to="/filters">
        <button type="button" className="filter_button">
          <img alt="filters" src="./src/assets/images/settings.png" />
          <p>Filtres</p>
        </button>
      </NavLink>
      {/* <button type="button" disabled={!isConnected} className="favorite_button">
        <img alt="favorite" src="./src/assets/images/heartFill.png" />
        <p>Favoris</p>
      </button> */}
    </div>
  );
}

export default NavBar;
