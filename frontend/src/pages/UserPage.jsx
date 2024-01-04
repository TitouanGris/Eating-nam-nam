import { useUser } from "../context/UserContext";

function UserPage() {
  const { userInfos } = useUser();

  return (
    <div className="user-container">
      <div className="user">
        <img src="/src/assets/images/man.png" alt="profile" />
        <div className="userInfos">
          <div>{userInfos.pseudo}</div>
          <div>{userInfos.email}</div>
        </div>
      </div>

      <div className="separationBarre" />
      <h2>Mes recettes favorites</h2>
      <p> toutes mes recettes favorites affichées ici</p>
      <div className="separationBarre" />
      <h2>Mes recettes ajoutées</h2>
      <p> toutes mes recettes ajoutées affichées ici</p>
    </div>
  );
}

export default UserPage;
