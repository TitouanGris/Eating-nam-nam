import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import NavBarMobile from "./components/NavBarMobile";
import NavBarDesktop from "./components/NavBarDesktop";
import { FiltersContextProvider } from "./context/FiltersContext";

function App() {
  const { pathname } = useLocation();

  const pagesWithoutNavBar = ["/", "/filters"];

  const [favoriteMobileisActive, setFavoriteMobileisActive] = useState(false);

  return (
    <FiltersContextProvider>
      <div className="app">
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
    </FiltersContextProvider>
  );
}

export default App;
