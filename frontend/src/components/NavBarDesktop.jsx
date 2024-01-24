// import { useState } from "react";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Signin from "./Signin";
import FiltersContext from "../context/FiltersContext";
import { useUser } from "../context/UserContext";

function NavBarDesktop() {
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
  const { userInfos, setFavorisBtn } = useUser();

  const [btnSignIn, setBtnSignIn] = useState(false);

  return (
    <div className="navBarDesktop">
      <div className="logo">
        <img src="/src/assets/images/logo.png" alt="" />
      </div>
      <div className="lien">
        <div className="lien1">
          <NavLink to="/browse">
            <button
              className="text"
              type="button"
              onClick={() => {
                setFavorisBtn(false);
              }}
            >
              Accueil
            </button>
          </NavLink>
          {userInfos.pseudo && (
            <>
              <NavLink to="/publish" onClick={handlePublish}>
                <p className="text">Publier</p>
              </NavLink>
              <NavLink to="/browse">
                <button
                  className="text"
                  type="button"
                  onClick={() => {
                    setFavorisBtn(true);
                  }}
                >
                  Favoris
                </button>
              </NavLink>
            </>
          )}
        </div>

        {userInfos.pseudo ? (
          <NavLink to="/account">
            <div className="account-link">
              <img src="src/assets/images/user.png" alt="user-page" />
              <p>{userInfos.pseudo}</p>
            </div>
          </NavLink>
        ) : (
          <div className="account-link">
            <img src="src/assets/images/user.png" alt="user-page" />
            <button
              type="button"
              onClick={() => {
                setBtnSignIn(!btnSignIn);
              }}
            >
              Créer son compte
            </button>
          </div>
        )}
      </div>
      {btnSignIn && <Signin btnSignIn={btnSignIn} />}
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
      {/* <button type="button" disabled={!isConnected} className="favorite_button">
        <img alt="favorite" src="./src/assets/images/heartFill.png" />
        <p>Favoris</p>
      </button> */}
    </div>
  );
}
export default NavBarDesktop;
