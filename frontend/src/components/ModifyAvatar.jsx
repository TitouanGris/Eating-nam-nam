import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useUser } from "../context/UserContext";

function ModifyAvatar({ isOpen, setShowModifyAvatar }) {
  const { userInfos, setUserInfos } = useUser();

  const [avatar, setAvatar] = useState([]);

  const [selectedAvatarId, setSelectedAvatarId] = useState(null);
  const [imageAvatar, setImageAvatar] = useState();

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
  }, []);

  const handleModifyAvatar = async () => {
    try {
      if (userInfos && userInfos.id && selectedAvatarId !== null) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/${userInfos.id}`,
          {
            pseudo: userInfos.pseudo,
            email: userInfos.email,
            password: userInfos.hashed_password,
            avatar_id: selectedAvatarId,
          }
        );
        setUserInfos({
          ...userInfos,
          avatarId: selectedAvatarId,
          image_url: imageAvatar,
        });
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
      <div className="modify-modal-content-avatar">
        <div className="avatar-container">
          {avatar.map((a) => (
            <span key={a.id}>
              <button
                onClick={() => {
                  setSelectedAvatarId(a.id);
                  setImageAvatar(a.image_url);
                }}
                type="button"
                className={
                  selectedAvatarId === a.id
                    ? "avatar-button-selected"
                    : "avatar-button"
                }
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
