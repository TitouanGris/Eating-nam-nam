import { useState } from "react";
import PropTypes from "prop-types";
import { useUser } from "../context/UserContext";

function ModifyAccount({ isOpen, setShowModifyAccount }) {
  const { userInfos, setUserInfos } = useUser();

  const [newUser, setNewUser] = useState({
    pseudo: "",
  });

  const handleModify = async () => {
    try {
      if (userInfos && userInfos.id) {
        await fetch(`http://localhost:3310/api/user/${userInfos.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        setNewUser({ pseudo: "" });
        setUserInfos({ ...userInfos, pseudo: newUser.pseudo });
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
          <p>Modifier ma photo</p>
        </div>
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
          onClick={() => {
            setShowModifyAccount(false);
            handleModify();
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
