import PropTypes from "prop-types";

function ModifyPreferences({ isOpen, deletePreference, onCancel }) {
  return (
    <div className={`confirm-modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <p>Êtes-vous sûr de vouloir supprimer cette préférence ?</p>
        <div className="buttons">
          <button type="button" onClick={deletePreference}>
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

export default ModifyPreferences;

ModifyPreferences.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  deletePreference: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
