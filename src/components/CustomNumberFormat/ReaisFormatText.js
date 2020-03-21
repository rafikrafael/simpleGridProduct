import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

function ReaisFormatText({ value, ...otherProps }) {
  return (
    <NumberFormat
      displayType={"text"}
      value={value}
      decimalScale={2}
      fixedDecimalScale={true}
      prefix={"R$ "}
      isNumericString={true}
      thousandSeparator={"."}
      decimalSeparator={","}
      {...otherProps}
    />
  );
}

ReaisFormatText.propTypes = {
  value: PropTypes.number
};

export default ReaisFormatText;
