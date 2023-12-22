// import { useState } from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import FiltersContext from "../context/FiltersContext";

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
  return (
    <div className="navBarDesktop">
      <div className="logo">
        <img src="/src/assets/images/logo.png" alt="" />
      </div>
      <div className="lien">
        <NavLink to="/browse">
          <p>Accueil</p>
        </NavLink>
        <NavLink to="/publish" onClick={handlePublish}>
          {/* <button
            type="button"
            // disabled={!isConnected}
            className="publish_button"
          > */}
          {/* <img alt="publish" src="./src/assets/images/add.png" /> */}
          <p>Publier</p>
          {/* </button> */}
        </NavLink>
      </div>
    </div>
  );
}
export default NavBarDesktop;
