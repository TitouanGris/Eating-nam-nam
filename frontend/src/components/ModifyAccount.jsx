import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useUser } from "../context/UserContext";
import ModifyAvatar from "./ModifyAvatar";

function ModifyAccount({ isOpen, setShowModifyAccount }) {
  const { userInfos, setUserInfos } = useUser();

  const [newUser, setNewUser] = useState({
    pseudo: userInfos.pseudo,
    email: userInfos.email,
    password: userInfos.hashed_password,
    is_admin: userInfos.is_admin,
    avatar_id: userInfos.avatar_id,
  });

  const [showModifyAvatar, setShowModifyAvatar] = useState(false);

  const handleModifyAvatar = () => {
    setShowModifyAvatar(true);
  };

  const handleModify1 = async () => {
    try {
      if (userInfos && userInfos.id) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/${userInfos.id}`,
          {
            pseudo: newUser.pseudo,
            email: userInfos.email,
            password: userInfos.hashed_password,
            avatar_id: userInfos.avatarId,
          }
        );
        setNewUser("");
        setUserInfos({
          ...userInfos,
          pseudo: newUser.pseudo,
          email: newUser.email,
        });
      } else {
        console.error("User information is undefined.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setShowModifyAccount(false);
    }
  };
  return (
    <div className={`modify-modal ${isOpen ? "open" : ""}`}>
      <div className="modify-modal-content">
        <div className="photo">
          <button type="button" onClick={handleModifyAvatar}>
            <p>Modifier ma photo</p>
            <img
              className="placeholderPic"
              src="./src/assets/images/icons8-camera-100.png"
              alt="Choose a pic"
            />
          </button>
        </div>
        {showModifyAvatar && (
          <ModifyAvatar
            isOpen={showModifyAvatar}
            setShowModifyAvatar={setShowModifyAvatar}
          />
        )}
        <div className="pseudo">
          <p>Modifier mon pseudo</p>
          <input
            type="text"
            name="pseudo"
            placeholder="Pseudo"
            value={newUser.pseudo}
            onChange={(e) => setNewUser({ ...newUser, pseudo: e.target.value })}
          />
        </div>
        <button
          type="button"
          className="terminer-button"
          onClick={() => {
            setShowModifyAccount(false);
            handleModify1();
          }}
        >
          Terminer
        </button>
        {/* {successMessage && (
      <div className="success-message">{successMessage}</div>
    )} */}
      </div>
    </div>
  );
}

ModifyAccount.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setShowModifyAccount: PropTypes.bool.isRequired,
};

export default ModifyAccount;
