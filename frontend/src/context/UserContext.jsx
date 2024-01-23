import { createContext, useState, useContext, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export function UserProvider({ children }) {
  // children permet d'importer le contenu des <> de app
  const [userInfos, setUserInfos] = useState({}); // le state est porté par le UserContext

  useEffect(() => {
    if (localStorage.user) {
      const user = JSON.parse(localStorage.user);
      setUserInfos(user);
    }
  }, []);

  // le useMemo permet de sauvegarder la valeur afin d'éviter des re-render inutile. C'est le tableau de dépendance qui va controller le trigger de MAJ
  const contextValue = useMemo(
    () => ({ userInfos, setUserInfos }),
    [userInfos, setUserInfos]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  // optimisation de "custom hook"
  return useContext(UserContext);
}

export default UserContext;

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
