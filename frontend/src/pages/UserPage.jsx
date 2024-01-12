import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ConfirmModal from "../components/ConfirmModal";
import ModifyAccount from "../components/ModifyAccount";
import FiltersContext from "../context/FiltersContext";
import Regime from "../components/Regime";

function UserPage() {
  const { userInfos, setUserInfos } = useUser();
  const { filterRegimeId } = useContext(FiltersContext);

  // const {
  //   setFilterRegime,
  //   setFilterPrice,
  //   setFilterCountry,
  //   setFilterDifficulty,
  // } = useContext(FiltersContext);

  const [file, setFile] = useState(undefined);
  const [avatar, setAvatar] = useState([]);

  const [modal, setModal] = useState(false);
  const [showModifyAccount, setShowModifyAccount] = useState(false);
  const [preferences, setPreferences] = useState([]);

  const [showModifyPreferences, setShowModifyPreferences] = useState(false);

  const navigate = useNavigate();

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
      // console.log(response.data);
      const table = [];

      response.data.result.forEach((e) => {
        table.push(e.name);
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
  };

  const submit = async (event) => {
    event.preventDefault();
    if (file) {
      // le formData permet de passer une image dans le body
      const formData = new FormData();
      formData.append("image", file); // on ajoute des données à notre formData avec append (couple clé, valeur)

      // dans le post, on passe le le formData dans le body pour l'envoyer au back
      await axios.post("http://localhost:3310/api/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchAvatar(); // suite au post, on relance la fonction qui permet de fetch les avatars pour ensuite mapper avec le nouvel avatar
    } else {
      console.error("Pas de pièce jointe de renseignée");
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
                  <div className="onePreferences">{preference}</div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowModifyPreferences(true)}
            >
              Modifier mes préférences
            </button>
            {showModifyPreferences && (
              <div>
                <Regime setPreferences={setPreferences} />
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
                    <div>
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
                  <button type="submit">Ajouter</button>
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