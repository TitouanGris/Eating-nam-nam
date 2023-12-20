import React from "react";
import PropTypes from "prop-types";

function Input({
  inputType,
  inputId,
  inputName,
  inputMinLength,
  inputMaxLength,
  inputPlaceholder,
  inputList,
  onChange,
  value,
  // onSelect
}) {
  return (
    <input
      type={inputType}
      id={inputId}
      name={inputName}
      minLength={inputMinLength}
      maxLength={inputMaxLength}
      placeholder={inputPlaceholder}
      list={inputList}
      onChange={onChange}
      value={value}
      // onSelect={onSelect}
    />
  );
}

Input.propTypes = {
  inputType: PropTypes.string.isRequired,
  inputId: PropTypes.string,
  inputName: PropTypes.string.isRequired,
  inputMinLength: PropTypes.string,
  inputMaxLength: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  inputList: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

Input.defaultProps = {
  inputMinLength: "0",
  inputMaxLength: "50000",
  inputPlaceholder: "",
  inputList: "",
  onChange: null,
  inputId: "inputId",
  value: "",
};
export default Input;
