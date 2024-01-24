import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useUser } from "../context/UserContext";

function ModifyAvatar({ isOpen, setShowModifyAvatar }) {
  const { userInfos, setUserInfos } = useUser();

  const [avatar, setAvatar] = useState([]);
  const [newUser, setNewUser] = useState({
    pseudo: userInfos.pseudo,
    email: userInfos.email,
    password: userInfos.password,
    avatarId: userInfos.avatar_id,
  });
  const [selectedAvatarId, setSelectedAvatarId] = useState(null);

  const fetchAvatar = async () => {
    try {
      const response = await axios.get(`http://localhost:3310/api/avatar`);
      setAvatar(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  const handleModifyAvatar = async () => {
    try {
      if (userInfos && userInfos.id && selectedAvatarId !== null) {
        await axios.put(`http://localhost:3310/api/user/${userInfos.id}`, {
          avatar_id: selectedAvatarId,
        });
        // Mettre à jour seulement le champ avatar_id
        setNewUser.avatar_id(selectedAvatarId);
        setUserInfos(newUser);
      } else {
        console.error(
          "User information is undefined or selectedAvatarId is null."
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setShowModifyAvatar(false);
    }
  };

  return (
    <div className={`modify-modal ${isOpen ? "open" : ""}`}>
      <div className="modify-modal-content">
        <div className="avatar-container">
          {avatar.map((a) => (
            <span key={a.id}>
              <button
                onClick={() => setSelectedAvatarId(a.id)}
                type="button"
                aria-label={`Select avatar ${a.id}`}
                // aria-label pour accesibilité user
              >
                <img
                  width="30px"
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                    a.image_url
                  }`}
                  alt=""
                />
              </button>
            </span>
          ))}
        </div>
        <button type="button" onClick={handleModifyAvatar}>
          Terminer
        </button>
      </div>
    </div>
  );
}

ModifyAvatar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setShowModifyAvatar: PropTypes.bool.isRequired,
};

export default ModifyAvatar;
