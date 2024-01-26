import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import FiltersContext from "../context/FiltersContext";
import Connexion from "./Connexion";
import { useUser } from "../context/UserContext";

function NavBarMobile({ setFavoriteMobileisActive }) {
  // const [isConnected, setIsConnected] = useState(false);
  // const handleConnected = () => {
  //   setIsConnected(!isConnected);
  // };

  const { pathname } = useLocation();
  // const pagesWithoutAcceuil = ["/browse"];
  const pagesWithoutFilter = ["/publish"];

  const [connexion, setConnexion] = useState(false);
  const navigate = useNavigate();
  const {
    setFilterCountry,
    setFilterDifficulty,
    setFilterDuration,
    setFilterPrice,
    setFilterRegime,
    setFilterType,
  } = useContext(FiltersContext);

  const { userInfos, setFavorisBtn } = useUser();

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
    navigate("/publish");
  };
  return (
    <div className="navBarMobile">
      <button
        // disabled={pagesWithoutAcceuil.includes(pathname)}
        type="button"
        className="home_button"
        onClick={() => {
          setFavorisBtn(false);
          navigate("/browse");
        }}
      >
        <img alt="home" src="/src/assets/images/home.png" />
        <p>Accueil</p>
      </button>

      {userInfos.pseudo ? (
        <>
          <NavLink to="/account">
            <div className="account-link">
              <img src="src/assets/images/account.png" alt="user-page" />
              <p>{userInfos.pseudo}</p>
            </div>
          </NavLink>

          <button
            onClick={handlePublish}
            type="button"
            className="publish_button"
          >
            <img alt="publish" src="./src/assets/images/add.png" />
            <p>Publier</p>
          </button>

          <button
            className="text"
            type="button"
            onClick={() => {
              setFavorisBtn(true);
              navigate("/browse");
            }}
          >
            <img alt="publish" src="./src/assets/images/heartfill.png" />
            <p>Favoris</p>
          </button>
        </>
      ) : (
        <div className="account-link">
          <img
            type="button"
            aria-hidden
            onClick={() => {
              setConnexion(!connexion);
            }}
            src="src/assets/images/account.png"
            alt="user-page"
          />
          <p>Connexion</p>
        </div>
      )}
      <button
        type="button"
        onClick={handleClick}
        className="filter_button"
        disabled={pagesWithoutFilter.includes(pathname)}
      >
        <img alt="filters" src="/src/assets/images/settings.png" />
        <p>Filtres</p>
      </button>

      {connexion && (
        <Connexion connexion={connexion} setConnexion={setConnexion} />
      )}
    </div>
  );
}

NavBarMobile.propTypes = {
  setFavoriteMobileisActive: PropTypes.func.isRequired,
};

export default NavBarMobile;
