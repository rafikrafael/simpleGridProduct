import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import grey from "@material-ui/core/colors/grey";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import DadosClienteSexo from "./DadosClienteSexo";
import MaterialTextField from "components/ReduxForm/MaterialTextField";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  headerLabel: {
    color: grey[600],
    fontWeight: "bold"
  },
  divider: {
    marginTop: 12,
    marginBottom: 15
  },
  produtoContainer: {
    marginTop: 10
  }
}));

function DadosCliente(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="subtitle1" className={classes.headerLabel}>
        Dados do Cliente
      </Typography>
      <Divider className={classes.divider} />
      <GridContainer spacing={2}>
        <GridItem xs={12} sm={6} md={5}>
          <Field
            name="clienteNome"
            component={MaterialTextField}
            label="Nome"
            placeholder="Nome do cliente aqui"
            variant="outlined"
            fullWidth={true}
            InputLabelProps={{
              shrink: true
            }}
          />
        </GridItem>

        <GridItem xs={12} sm={6} md={5}>
          <Field
            name="clienteEmail"
            component={MaterialTextField}
            label="Email"
            placeholder="Digite seu email aqui"
            variant="outlined"
            fullWidth={true}
            InputLabelProps={{
              shrink: true
            }}
          />
        </GridItem>

        <GridItem xs={12} sm={4} md={2}>
          <DadosClienteSexo />
        </GridItem>
      </GridContainer>
    </div>
  );
}

DadosCliente.propTypes = {};

export default DadosCliente;
