import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ConfirmModal from "../components/ConfirmModal";
import ModifyAccount from "../components/ModifyAccount";
import ModifyPreferences from "../components/ModifyPreferences";
import FiltersContext from "../context/FiltersContext";
import Regime from "../components/Regime";
import Button from "../components/Button";

function UserPage() {
  const { userInfos, setUserInfos } = useUser();
  const {
    filterRegimeId,
    setFilterCountry,
    setFilterDifficulty,
    setFilterDuration,
    setFilterPrice,
    setFilterRegime,
    setFilterType,
    setFavorisTable,
  } = useContext(FiltersContext);

  const [modal, setModal] = useState(false);
  const [showModifyAccount, setShowModifyAccount] = useState(false);
  const [showModalTag, setShowModalTag] = useState(false);

  const [preferences, setPreferences] = useState([]);
  const [userRecipe, setUserRecipe] = useState([]);

  const [showModifyPreferences, setShowModifyPreferences] = useState(false);
  const navigate = useNavigate();

  const [preferenceId, setPreferenceId] = useState();

  const logout = () => {
    setUserInfos({});
    setFilterPrice([]);
    setFilterDifficulty([]);
    setFilterDuration([]);
    setFilterRegime([]);
    setFilterCountry([]);
    setFilterType([]);
    setFavorisTable([]);
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
        const object = { name: e.name, id: e.id };
        table.push(object);
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
    setShowModalTag(false);
  };

  const deletePreference = async () => {
    if (preferenceId) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/usertags`, {
          data: { userInfosId: userInfos.id, preferenceId },
        });
        fetchData();
        closeModal();

        // get pour récupérer les préférences utilisations de la DB avec le user ID
        try {
          const res2 = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/usertags/${userInfos.id}`
          );
          const regimeTable = [];
          const countryTable = [];
          const priceTable = [];
          const difficultyTable = [];
          res2.data.result.forEach((e) => {
            if (e.category_id === 1) {
              priceTable.push(e.name);
            }
            if (e.category_id === 2) {
              countryTable.push(e.name);
            }
            if (e.category_id === 3) {
              regimeTable.push(e.name);
            }
            if (e.category_id === 4) {
              difficultyTable.push(e.name);
            }
          });
          setFilterRegime(regimeTable);
          localStorage.setItem("regimeTable", JSON.stringify(regimeTable));
          setFilterCountry(countryTable);
          localStorage.setItem("countryTable", JSON.stringify(countryTable));
          setFilterPrice(priceTable);
          localStorage.setItem("priceTable", JSON.stringify(priceTable));
          setFilterDifficulty(difficultyTable);
          localStorage.setItem(
            "difficultyTable",
            JSON.stringify(difficultyTable)
          );
        } catch (error) {
          console.error(error);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Pas de pref selectionnée");
    }
  };

  return (
    <div className="userPage">
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
                    {showModalTag && (
                      <ModifyPreferences
                        isOpen={showModalTag}
                        deletePreference={deletePreference}
                        onCancel={closeModal}
                      />
                    )}
                    <div className="onePreferences">
                      {preference.name}
                      <button
                        type="button"
                        onClick={() => {
                          setPreferenceId(preference.id);
                          setShowModalTag(true);
                        }}
                      >
                        ❌
                      </button>
                    </div>
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
                  <Regime setShowModifyPreferences={setShowModifyPreferences} />
                </div>
              )}
            </div>
          </div>

          <div className="userRecipeBox">
            <div className="separationBarre" />
            <h2>Mes recettes ajoutées</h2>
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
                              : "/logo.png"
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
        <Button label="Déconnexion" onClick={logout} className="reset-button" />
        {modal && (
          <ConfirmModal
            isOpen={modal}
            onConfirm={confirmDelete}
            onCancel={closeModal}
          />
        )}
      </div>
    </div>
  );
}

export default UserPage;
