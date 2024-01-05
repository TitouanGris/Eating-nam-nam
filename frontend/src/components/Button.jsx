import React from "react";
import PropTypes from "prop-types";

// todo : modifier l'ensemble des composants/pages qui appelent l'usine à bouton pour exploiter une className générique avec complément via le props Style

function Button({ label, onClick, className, disabled, key, style = {} }) {
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      disabled={disabled}
      key={key}
      style={style}
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  key: PropTypes.string,
  style: PropTypes.shape({}),
};

Button.defaultProps = {
  disabled: false,
  onClick: null,
  key: null,
  style: {},
};

export default Button;
