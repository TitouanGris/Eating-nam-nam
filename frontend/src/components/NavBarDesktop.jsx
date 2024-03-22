import React, { useContext, useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Signin from "./Signin";
import FiltersContext from "../context/FiltersContext";
import { useUser } from "../context/UserContext";
import Connexion from "./Connexion";

function NavBarDesktop() {
  const {
    setFilterCountry,
    setFilterDifficulty,
    setFilterDuration,
    setFilterPrice,
    setFilterRegime,
    setFilterType,
    setFavorisTable,
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
    setFilterPrice([]);
    setFilterDifficulty([]);
    setFilterDuration([]);
    setFilterRegime([]);
    setFilterCountry([]);
    setFilterType([]);
    setFavorisTable([]);
    localStorage.clear();
    setFavorisBtn(false);
    navigate("/");
  };

  const menuBurgerRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuBurgerRef.current &&
        !menuBurgerRef.current.contains(event.target)
      ) {
        setMenuBurger(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuBurgerRef]);

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
          <div className="account-link" ref={menuBurgerRef}>
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
        <div className="menuBurger" ref={menuBurgerRef}>
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
