import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ConfirmModal from "../components/ConfirmModal";
import ModifyAccount from "../components/ModifyAccount";
import ModifyPreferences from "../components/ModifyPreferences";
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
  const [showModalTag, setShowModalTag] = useState(false);

  const [preferences, setPreferences] = useState([]);

  const [showModifyPreferences, setShowModifyPreferences] = useState(false);
  const navigate = useNavigate();

  const [preferenceId, setPreferenceId] = useState();

  const logout = () => {
    setUserInfos({});
    navigate("/");
  };

  const fetchAvatar = async () => {
    try {
      const response = await axios.get(`http://localhost:3310/api/avatar`);
      setAvatar(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3310/api/usertags/${userInfos.id}`,
        {
          params: {
            userInfosId: userInfos.id,
            filterRegimeId: filterRegimeId.join(","),
          },
        }
      );
      const table = [];

      response.data.result.forEach((e) => {
        const object = { name: e.name, id: e.id };
        table.push(object);
      });
      setPreferences(table);
    } catch (error) {
      console.error(error);
    }
  };

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
      await fetch(`http://localhost:3310/api/user/${userInfos.id}`, {
        method: "DELETE",
      });
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
    setShowModalTag(false);
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
        await axios.post("http://localhost:3310/api/avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
          },
        });
        fetchAvatar(); // suite au post, on relance la fonction qui permet de fetch les avatars pour ensuite mapper avec le nouvel avatar
      } else {
        console.error("Pas de pièce jointe de renseignée");
      }
    }
  };

  const deletePreference = async () => {
    if (preferenceId) {
      try {
        await axios.delete(`http://localhost:3310/api/usertags`, {
          data: { userInfosId: userInfos.id, preferenceId },
        });
        fetchData();
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Pas de pref selectionnée");
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
          <p>{userInfos.pseudo}</p>
          <p>{userInfos.email}</p>
        </div>
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
                <div key={preference.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setPreferenceId(preference.id);
                      setShowModalTag(true);
                    }}
                  >
                    &times;
                  </button>
                  {showModalTag && (
                    <ModifyPreferences
                      isOpen={showModalTag}
                      deletePreference={deletePreference}
                      onCancel={closeModal}
                    />
                  )}
                  <div className="onePreferences">{preference.name}</div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="button-user-preferences"
              onClick={() => setShowModifyPreferences(true)}
            >
              Ajouter des préférences
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
                    +
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div>
          <div className="separationBarre" />
          <h2>Mes recettes ajoutées</h2>
          <p> Toutes mes recettes ajoutées affichées ici</p>
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
