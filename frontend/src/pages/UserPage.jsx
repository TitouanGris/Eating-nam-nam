import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ConfirmModal from "../components/ConfirmModal";
import ModifyAccount from "../components/ModifyAccount";

function UserPage() {
  const { userInfos, setUserInfos } = useUser();

  const [modal, setModal] = useState(false);
  const [showModifyAccount, setShowModifyAccount] = useState(false);

  const navigate = useNavigate();

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

  return (
    <div className="user-container">
      <h1>Mon compte</h1>
      <div className="user">
        <img src="/src/assets/images/man.png" alt="profile" />
        <div className="userInfos">
          <div>{userInfos.pseudo}</div>
          <div>{userInfos.email}</div>
        </div>
        <div className="modify-button">
          <button type="button" onClick={handleModifyAccount}>
            Modifier le compte
          </button>
        </div>
        {showModifyAccount && (
          <ModifyAccount
            isOpen={showModifyAccount}
            setShowModifyAccount={setShowModifyAccount}
          />
        )}
      </div>
      <div className="infos-user">
        <div>
          <div className="separationBarre" />
          <h2>Mes recettes favorites</h2>
          <p> Toutes mes recettes favorites affichées ici</p>
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
