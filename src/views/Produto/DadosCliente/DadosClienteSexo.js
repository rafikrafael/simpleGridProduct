import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import { Field } from "redux-form";
import MaterialTextField from "components/ReduxForm/MaterialTextField";

function DadosClienteSexo() {
  return (
    <Field
      name="clienteSexo"
      component={MaterialTextField}
      label="Sexo"
      placeholder="Selecione"
      variant="outlined"
      fullWidth={true}
      select
      SelectProps={{
        displayEmpty: true
      }}
      value={""}
      InputLabelProps={{
        shrink: true
      }}
    >
      <MenuItem value="" disabled>
        Selecione
      </MenuItem>
      <MenuItem value="F">Feminio</MenuItem>
      <MenuItem value="M">Masculino</MenuItem>
      <MenuItem value="O">Outro</MenuItem>
    </Field>
  );
}

DadosClienteSexo.propTypes = {};

export default DadosClienteSexo;
