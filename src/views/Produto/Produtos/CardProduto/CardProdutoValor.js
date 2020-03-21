import React from "react";
import PropTypes from "prop-types";
import grey from "@material-ui/core/colors/grey";
import { makeStyles } from "@material-ui/core/styles";
import ReaisFormatText from "components/CustomNumberFormat/ReaisFormatText";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 2,
    paddingBottom: 2
  },
  valorProduto: {
    fontWeight: "bold",
    color: grey["600"]
  }
}));

function CardProdutoValor({ valor }) {
  const classes = useStyles();

  const renderValor = valor => (
    <Typography variant="h6" className={classes.valorProduto}>
      {valor}
    </Typography>
  );

  return (
    <div className={classes.container}>
      <ReaisFormatText value={valor} renderText={renderValor} />
    </div>
  );
}

CardProdutoValor.propTypes = {
  valor: PropTypes.number
};

export default CardProdutoValor;
