import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import NavBarMobile from "./components/NavBarMobile";
import NavBarDesktop from "./components/NavBarDesktop";
import { FiltersContextProvider } from "./context/FiltersContext";
import { UserProvider } from "./context/UserContext";

function App() {
  const { pathname } = useLocation();

  const pagesWithoutNavBar = ["/", "/filters", "/connexion"];

  const [favoriteMobileisActive, setFavoriteMobileisActive] = useState(false);

  return (
    // le userProvider permet de fournir les infos du user à tous les enfants de APP (via un context)

    <FiltersContextProvider>
      <UserProvider>
        <div className="app" id="app">
          <div className="navBarDesktopArea">
            {!pagesWithoutNavBar.includes(pathname) && <NavBarDesktop />}
          </div>
          <div className="App">
            <Outlet
              context={[favoriteMobileisActive, setFavoriteMobileisActive]}
            />
            <div className="navBarMobileArea">
              {!pagesWithoutNavBar.includes(pathname) && (
                <NavBarMobile
                  setFavoriteMobileisActive={setFavoriteMobileisActive}
                />
              )}
            </div>
          </div>
        </div>
      </UserProvider>
    </FiltersContextProvider>
  );
}

export default App;
