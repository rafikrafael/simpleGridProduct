import React from "react";
import PropTypes from "prop-types";
import grey from "@material-ui/core/colors/grey";
import { isNaN, isNumber } from "lodash";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReaisFormatText from "components/CustomNumberFormat/ReaisFormatText";

const useStyles = makeStyles(() => ({
  textoDesconto: {
    fontSize: 10,
    color: grey[600]
  }
}));

const calculaValorDesconto = (valor, percDesconto) => {
  if (!isNumber(percDesconto) || isNaN(percDesconto)) return 0;
  const valorDesconto = Number(valor) * (Number(percDesconto) / 100);
  return Number(Number(valor) - Number(valorDesconto));
};

function CardProdutoVrDesconto({ valor, percentualDescontoAvista }) {
  const classes = useStyles();
  const renderDesconto = valor => (
    <Typography
      className={classes.textoDesconto}
      variant="subtitle2"
    >{`${valor} à vista (${percentualDescontoAvista}% de desconto)`}</Typography>
  );

  return React.useMemo(() => {
    const valorAVista = Number(
      calculaValorDesconto(valor, percentualDescontoAvista)
    );
    return Number(valorAVista) > 0 ? (
      <ReaisFormatText value={valorAVista} renderText={renderDesconto} />
    ) : null;
  }, [valor, percentualDescontoAvista]);
}

CardProdutoVrDesconto.propTypes = {
  valor: PropTypes.number,
  percentualDescontoAvista: PropTypes.number
};

export default CardProdutoVrDesconto;
