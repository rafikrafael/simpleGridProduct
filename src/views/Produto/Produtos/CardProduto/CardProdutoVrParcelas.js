import React from "react";
import PropTypes from "prop-types";
import grey from "@material-ui/core/colors/grey";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReaisFormatText from "components/CustomNumberFormat/ReaisFormatText";

const useStyles = makeStyles(() => ({
  textoDesconto: {
    fontSize: 10,
    color: grey[600]
  }
}));

function CardProdutoVrParcelas({ valor, quantidadeParcelas }) {
  const classes = useStyles();

  const renderParcela = valor => (
    <Typography
      className={classes.textoDesconto}
      variant="subtitle2"
    >{`Em até ${quantidadeParcelas}x de ${valor}`}</Typography>
  );

  return React.useMemo(() => {
    const valorParcela = Number(
      Number(quantidadeParcelas) > 0
        ? Number(Number(valor) / Number(quantidadeParcelas))
        : 0
    );
    return Number(valor) > 0 ? (
      <ReaisFormatText value={valorParcela} renderText={renderParcela} />
    ) : null;
  }, [valor, quantidadeParcelas]);
}

CardProdutoVrParcelas.propTypes = {
  valor: PropTypes.number,
  quantidadeParcelas: PropTypes.number
};

export default CardProdutoVrParcelas;
