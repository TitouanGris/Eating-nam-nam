import { createContext, useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export function UserProvider({ children }) {
  // children permet d'importer le contenu des <> de app
  const [userInfos, setUserInfos] = useState({}); // le state est porté par le UserContext

  // le useMemo est obligatoire avec esLint mais normalement pas nécéssaire dans notre cas.
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
