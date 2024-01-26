import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { loadIngredientsData } from "./RecipePost";
import Input from "../components/Input";

// import { useUser } from "../context/UserContext";

function AdminPage() {
  const { userInfos } = useUser();
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [file, setFile] = useState(undefined);
  const [avatar, setAvatar] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ingValue, setIngValue] = useState("");
  const [verifIng, setVerifIng] = useState(false);
  const [sucessIngAdd, setSucessIngAdd] = useState(false);
  const token = localStorage.getItem("token");
  const [previewURL, setPreviewURL] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3310/api/adminRecipe`)
      .then((res) => setRecipes(res.data));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3310/api/users`)
      .then((res) => setUserList(res.data));
  }, []);

  async function deleteUser(id) {
    try {
      await axios
        .delete(`http://localhost:3310/api/user/${id}`)
        .then((res) => console.info(res));
    } catch (err) {
      console.error(err);
    }
  }
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewURL(URL.createObjectURL(selectedFile));
    console.info(selectedFile);
  };
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
    if (token) {
      event.preventDefault();
      if (file) {
        // le formData permet de passer une image dans le body
        const formData = new FormData();
        console.info(formData.toString());
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
        setPreviewURL(undefined);
        fetchAvatar(); // suite au post, on relance la fonction qui permet de fetch les avatars pour ensuite mapper avec le nouvel avatar
      } else {
        console.error("Pas de pièce jointe de renseignée");
      }
    }
  };

  async function loading() {
    setIngredients(await loadIngredientsData());
  }
  useEffect(() => {
    loading();
  }, []);
  const handleIngValue = (event) => {
    const { value } = event.target;
    setIngValue(value);
  };
  async function handleAddIng() {
    if (
      ingredients.find(
        (ing) => ing.name.toLowerCase() === ingValue.toLowerCase()
      )
    ) {
      setVerifIng(true);
    } else {
      // mise en Camel case du mot :
      const ingToPush =
        ingValue.charAt(0).toUpperCase() + ingValue.toLowerCase().slice(1);
      // push dans la DB
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/ingredients`,
          { ingToPush },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
            },
          }
        );
        // on récupère à nouveau la DB :
        if (res.status === 201) {
          setSucessIngAdd(true);
          setIngValue("");
          loading();
        }
      } catch (error) {
        console.error("Error POST request:", error);
      }
    }
  }
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
          <form onSubmit={submit} className="upload-form">
            <input
              name={file}
              onChange={handleFileChange}
              type="file"
              accept="image/*"
              id="file-input"
            />
            <label htmlFor="file-input" className="upload">
              {previewURL ? (
                <div className="add-avatar-button">
                  <button type="submit" className="button-user-avatar">
                    Télécharger
                  </button>
                </div>
              ) : (
                <div className="add-avatar-button">Ajouter un avatar</div>
              )}
            </label>
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

      <div className="ingredientSection">
        <h2>Ajouter des ingrédients</h2>
        <div className="ingList">
          <Input
            className="ingInput1"
            inputType="text"
            inputPlaceholder="Entrez votre ingrédient"
            inputList="ingredientList"
            inputName="ingredientList"
            value={ingValue}
            onChange={(event) => {
              handleIngValue(event);
              setVerifIng(false);
              setSucessIngAdd(false);
            }}
          />{" "}
          <datalist id="ingredientList">
            {ingredients.map((ingredient) => {
              return (
                <option key={ingredient.id} value={ingredient.name}>
                  {ingredient.name}
                </option>
              );
            })}
          </datalist>
          <button onClick={handleAddIng} type="button">
            Ajouter
          </button>
        </div>
        <div className="messageArea">
          {" "}
          {verifIng === true && (
            <p>
              ⚠️ L'ingrédient sélectionné est déjà présent dans la liste ou a
              déja été ajouté
            </p>
          )}
          {sucessIngAdd && (
            <p>🎇 Félicitations l'ingrédient à été ajouté avec succès.</p>
          )}
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
