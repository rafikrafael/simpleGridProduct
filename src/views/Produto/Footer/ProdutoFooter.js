import React from "react";
import PropTypes from "prop-types";
import orange from "@material-ui/core/colors/orange";
import grey from "@material-ui/core/colors/grey";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import ReaisFormatText from "components/CustomNumberFormat/ReaisFormatText";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  vrTotalContainer: {
    paddingTop: 2,
    paddingBottom: 2
  },
  vrTotal: {
    color: grey[600]
  },
  btnFinalizarContainer: {
    paddingTop: 2,
    paddingBottom: 2
  },
  btnFinalizar: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
    backgroundColor: orange[500],
    "&:hover": {
      backgroundColor: orange[700]
    }
  }
}));

function ProdutoFooter({ disableSubmit, valorTotal = 0 }) {
  const classes = useStyles();

  const renderVrTotal = valor => (
    <Typography variant="h6" className={classes.vrTotal}>
      <strong>Total: {valor}</strong>
    </Typography>
  );

  return (
    <div className={classes.container}>
      <GridContainer justify="flex-end" className={classes.vrTotalContainer}>
        <GridItem>
          <ReaisFormatText value={valorTotal} renderText={renderVrTotal} />
        </GridItem>
      </GridContainer>
      <GridContainer
        justify="flex-end"
        className={classes.btnFinalizarContainer}
      >
        <GridItem xs={7} sm={3} md={2}>
          <Button
            variant="contained"
            disabled={disableSubmit}
            type="submit"
            fullWidth={true}
            className={classes.btnFinalizar}
          >
            FINALIZAR COMPRA
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  );
}

ProdutoFooter.propTypes = {
  disableSubmit: PropTypes.bool,
  valorTotal: PropTypes.number
};

export default ProdutoFooter;
