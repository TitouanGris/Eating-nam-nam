import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ConfirmModal from "../components/ConfirmModal";
import ModifyAccount from "../components/ModifyAccount";
import FiltersContext from "../context/FiltersContext";
import Regime from "../components/Regime";
import Button from "../components/Button";

function UserPage() {
  const { userInfos, setUserInfos } = useUser();
  const { filterRegimeId } = useContext(FiltersContext);

  const [file, setFile] = useState(undefined);
  const [avatar, setAvatar] = useState([]);

  const [modal, setModal] = useState(false);
  const [showModifyAccount, setShowModifyAccount] = useState(false);
  const [preferences, setPreferences] = useState([]);
  const [userRecipe, setUserRecipe] = useState([]);

  const [showModifyPreferences, setShowModifyPreferences] = useState(false);
  const navigate = useNavigate();

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

  const logout = () => {
    setUserInfos({});
    localStorage.clear();
    navigate("/");
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/usertags/${userInfos.id}`,
        {
          params: {
            userInfosId: userInfos.id,
            filterRegimeId: filterRegimeId.join(","),
          },
        }
      );
      const table = [];

      response.data.result.forEach((e) => {
        table.push(e.name);
      });
      setPreferences(table);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserRecipe = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes/user/${userInfos.id}`
      );
      setUserRecipe(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserRecipe();
  }, [userInfos.id]);

  useEffect(() => {
    fetchAvatar();
    fetchData();
  }, [userInfos.id, filterRegimeId]);

  const handleDeleteUser = async () => {
    setModal(true);
  };
  const handleModifyAccount = () => {
    setShowModifyAccount(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/${userInfos.id}`,
        {
          method: "DELETE",
        }
      );
      setUserInfos("");
    } catch (err) {
      console.error(err);
    } finally {
      setModal(false);
      setTimeout(() => {
        navigate("/browse");
      }, 2000);
    }
  };

  const closeModal = () => {
    setModal(false);
  };

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
        console.error("Pas de pièce jointe de renseignée");
      }
    }
  };
  return (
    <div className="user-container">
      <h1>Mon compte</h1>
      <div className="user">
        {/* attention chemin de l'url pour aller chercher l'image ne pas mettre public car cest le dossier static inndiqué dans app.js */}
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
            userInfos.image_url
          }`}
          alt="profile"
        />
        <div className="userInfos">
          <div>{userInfos.pseudo}</div>
          <div>{userInfos.email}</div>
        </div>
      </div>

      <div className="admin-button">
        {userInfos.is_admin === 1 && (
          <button
            type="button"
            onClick={() => {
              navigate("/account/admin");
            }}
          >
            Page admin
          </button>
        )}
      </div>
      <div className="modify-button">
        <button type="button" onClick={handleModifyAccount}>
          Modifier mes informations
        </button>
      </div>
      {showModifyAccount && (
        <ModifyAccount
          isOpen={showModifyAccount}
          setShowModifyAccount={setShowModifyAccount}
        />
      )}
      <div className="infos-user">
        <div>
          <div className="separationBarre" />
          <div className="preferences-container">
            <h2>Mes préférences</h2>
            <div className="preferences">
              {preferences.map((preference) => (
                <div key={preference.name}>
                  <div className="onePreferences">{preference}</div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="button-user-preferences"
              onClick={() => setShowModifyPreferences(true)}
            >
              Modifier mes préférences
            </button>
            {showModifyPreferences && (
              <div>
                <Regime />
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="separationBarre" />
          <div className="avatars">
            <div className="avatars-container">
              <h2>Ajouter des avatars</h2>
              <div className="avatar-map">
                {avatar.map((a) => {
                  return (
                    <div key={a.id}>
                      <img
                        width="30px"
                        src={`${
                          import.meta.env.VITE_BACKEND_URL
                        }/images/avatar/${a.image_url}`}
                        alt=""
                      />
                    </div>
                  );
                })}
              </div>
              {/* form submit nouvel avatar */}
              <form onSubmit={submit}>
                <input
                  name={file}
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  accept="image/*"
                />
                <div className="add-avatar-button">
                  <button type="submit" className="button-user-avatar">
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="userRecipeBox">
          <div className="separationBarre" />
          <h2>Mes recettes ajoutées</h2>
          <p> Toutes mes recettes ajoutées affichées ici</p>
          <div className="userRecipe">
            {userRecipe.map((r) => {
              return (
                <Link
                  key={r.recipeId}
                  to={`/recipe/${r.recipeId}`}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <div
                    className={
                      r.validate_recipe
                        ? "userRecipeCard"
                        : "userRecipeCard notValidateRecipe"
                    }
                  >
                    <div className="imgBox">
                      <img
                        src={
                          r.recipeImage !== "/images/undefined"
                            ? `${import.meta.env.VITE_BACKEND_URL}${
                                r.recipeImage
                              }`
                            : "/src/assets/images/logo.png"
                        }
                        alt={r.recipeName}
                      />
                    </div>
                    <p>{r.recipeName}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="delete-button">
        <button type="button" onClick={handleDeleteUser}>
          Supprimer mon compte
        </button>
      </div>
      <Button label="déconnexion" onClick={logout} className="reset-button" />
      {modal && (
        <ConfirmModal
          isOpen={modal}
          onConfirm={confirmDelete}
          onCancel={closeModal}
        />
      )}
    </div>
  );
}

export default UserPage;
