import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { useUser } from "../context/UserContext";

function AdminPage() {
  // const { userInfos, setUserInfos } = useUser();

  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3310/api/adminRecipe`)
      .then((res) => setRecipes(res.data));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3310/api/users`)
      .then((res) => setUserList(res.data));
  }, [userList]);

  async function deleteUser(id) {
    try {
      await axios
        .delete(`http://localhost:3310/api/user/${id}`)
        .then((res) => console.info(res))
        .then(alert(`Utilisateur supprimé`));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="adminPage">
      <div className="recipeSection">
        <h1>Valider une recette</h1>
        <div className="recipeList">
          {recipes.map(({ id, name: recipeName, photo_url: recipeImage }) => {
            return (
              <Link to={`/recipe/${id}`}>
                <button type="button" className="recipeDiv" key={id}>
                  <p>{recipeName}</p>
                  <div className="imgDiv">
                    <img
                      className="recipeImg"
                      src={`http://localhost:3310${recipeImage}`}
                      alt={recipeName}
                    />
                  </div>
                </button>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="userSection">
        <h1>Gérer un utilisateur</h1>
        <div className="searchUser">
          <p>Trouver un utilisateur par son nom</p>
          <input
            name="search"
            defaultValue=""
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="userList">
          {userList
            .filter((person) =>
              search === ""
                ? false
                : person.pseudo.toLowerCase().includes(search.toLowerCase())
            )
            .map((user) => {
              return (
                search.length > 2 && (
                  <div className="userCard" key={user.email}>
                    <div className="userAvatar">
                      <img
                        className="avatarImg"
                        src={`${
                          import.meta.env.VITE_BACKEND_URL
                        }/images/avatar/${user.image_url}`}
                        alt="profile"
                      />
                      <div className="userPseudoEmail">
                        <p className="pseudo">{user.pseudo}</p>
                        <p className="email">{user.email}</p>
                      </div>
                    </div>
                    <div className="deleteButton">
                      <button type="button" onClick={() => deleteUser(user.id)}>
                        Delete {user.pseudo}
                      </button>
                    </div>
                  </div>
                )
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
