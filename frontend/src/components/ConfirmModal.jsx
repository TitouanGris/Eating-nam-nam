import PropTypes from "prop-types";

function ConfirmModal({ isOpen, onConfirm, onCancel }) {
  return (
    <div className={`confirm-modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
        <div className="buttons">
          <button type="button" onClick={onConfirm}>
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

export default ConfirmModal;

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
