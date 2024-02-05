// import { useState } from "react";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Signin from "./Signin";
import FiltersContext from "../context/FiltersContext";
import { useUser } from "../context/UserContext";
import Connexion from "./Connexion";

function NavBarDesktop() {
  // const [isConnected, setIsConnected] = useState(false);
  // const handleConnected = () => {z
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

  const navigate = useNavigate();

  const handlePublish = () => {
    setFilterPrice([]);
    setFilterDifficulty([]);
    setFilterDuration([]);
    setFilterRegime([]);
    setFilterCountry([]);
    setFilterType([]);
    navigate("/publish");
  };
  const { userInfos, setFavorisBtn, setUserInfos } = useUser();

  const [inscription, setInscription] = useState(false);
  const [connexion, setConnexion] = useState(false);

  const [menuBurger, setMenuBurger] = useState(false);

  const logout = () => {
    setUserInfos({});
    localStorage.clear();
    navigate("/");
  };

  const handleClickConnexion = () => {
    setConnexion(!connexion);
    setMenuBurger(!menuBurger);
  };

  const handleClickInscription = () => {
    setInscription(!inscription);
    setMenuBurger(!menuBurger);
  };

  return (
    <div className="navBarDesktop">
      <div className="logo">
        <img src="/logo.png" alt="" />
      </div>
      <div className="lien">
        <div className="lien1">
          <button
            className="text"
            type="button"
            onClick={() => {
              setFavorisBtn(false);
              navigate("/browse");
            }}
          >
            Accueil
          </button>
          {userInfos.pseudo && (
            <>
              <button className="text" type="button" onClick={handlePublish}>
                Publier
              </button>
              <button
                className="text"
                type="button"
                onClick={() => {
                  setFavorisBtn(true);
                  navigate("/browse");
                }}
              >
                Favoris
              </button>
            </>
          )}
        </div>

        {userInfos.pseudo ? (
          <button
            type="button"
            className="account-link"
            onClick={() => setMenuBurger(!menuBurger)}
          >
            <p>{userInfos.pseudo}</p>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                userInfos.image_url
              }`}
              alt="user-page"
              aria-hidden
            />
          </button>
        ) : (
          <div className="account-link">
            <img
              src="/user.png"
              alt="user-page"
              aria-hidden
              onClick={() => setMenuBurger(!menuBurger)}
            />
          </div>
        )}
      </div>
      {menuBurger && (
        <div className="menuBurger">
          {userInfos.pseudo && (
            <>
              <NavLink to="/account">
                <div aria-hidden onClick={() => setMenuBurger(!menuBurger)}>
                  Mon profil
                </div>
              </NavLink>
              <div aria-hidden type="button" onClick={logout}>
                Deconnexion
              </div>
            </>
          )}

          {!userInfos.pseudo && (
            <>
              <div type="button" aria-hidden onClick={handleClickConnexion}>
                {" "}
                Connexion{" "}
              </div>
              <div type="button" aria-hidden onClick={handleClickInscription}>
                Créer son compte
              </div>{" "}
            </>
          )}
        </div>
      )}

      {inscription && (
        <Signin inscription={inscription} setInscription={setInscription} />
      )}
      {connexion && (
        <Connexion connexion={connexion} setConnexion={setConnexion} />
      )}
    </div>
  );
}
export default NavBarDesktop;
