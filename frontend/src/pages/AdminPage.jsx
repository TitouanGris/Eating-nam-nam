import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
// import { useUser } from "../context/UserContext";

function AdminPage() {
  const { userInfos } = useUser();
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [file, setFile] = useState(undefined);
  const [avatar, setAvatar] = useState([]);

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
        .then((res) => console.info(res));
    } catch (err) {
      console.error(err);
    }
  }

  const fetchAvatar = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/avatar`
      );
      setAvatar(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, [userInfos.id]);

  const submit = async (event) => {
    const token = localStorage.getItem("token");
    if (token) {
      event.preventDefault();
      if (file) {
        // le formData permet de passer une image dans le body
        const formData = new FormData();
        formData.append("image", file); // on ajoute des données à notre formData avec append (couple clé, valeur)
        // dans le post, on passe le le formData dans le body pour l'envoyer au back
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/avatar`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
            },
          }
        );
        fetchAvatar(); // suite au post, on relance la fonction qui permet de fetch les avatars pour ensuite mapper avec le nouvel avatar
      } else {
        console.error("Pas de pièce jointe renseignée");
      }
    }
  };

  return (
    <div className="adminPage">
      <div className="avatarSection">
        <h2>Ajouter des avatars</h2>
        <div className="avatars-container">
          <div className="avatar-map">
            {avatar.map((a) => {
              return (
                <div key={a.id}>
                  <img
                    width="30px"
                    src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                      a.image_url
                    }`}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
          <form onSubmit={submit}>
            <input
              name={file}
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              accept="image/*"
            />
            <button type="submit" className="button-user-avatar">
              Valider
            </button>
          </form>
        </div>
      </div>
      <div className="recipeSection">
        <h2>Valider une recette</h2>
        <div className="recipeList">
          {recipes.map(({ id, name: recipeName, photo_url: recipeImage }) => {
            return (
              <Link to={`/recipe/${id}`}>
                <button type="button" className="recipeDiv" key={id}>
                  <p>
                    {recipeName.length > 20
                      ? `${recipeName.substring(0, 20)}...`
                      : recipeName}
                  </p>
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
        <h2>Gérer un utilisateur</h2>
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
                        Supprimer {user.pseudo}
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
