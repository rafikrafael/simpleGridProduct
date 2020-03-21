import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

function MaterialTextField({
  label,
  placeholder,
  input,
  meta: { touched, invalid, error },
  ...custom
}) {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  );
}

MaterialTextField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  input: PropTypes.any,
  meta: PropTypes.object
};

export default MaterialTextField;
