import PropTypes from "prop-types";

function DeleteUserModal({ isOpen, deleteUser, onCancel }) {
  const handleConfirm = () => {
    deleteUser();
  };

  return (
    <div className={`confirm-modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
        <div className="buttons">
          <button
            type="button"
            onClick={() => {
              handleConfirm();
            }}
          >
            Oui
          </button>
          <button type="button" onClick={onCancel}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUserModal;

DeleteUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  deleteUser: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
