import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import grey from "@material-ui/core/colors/grey";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CardProdutoVrParcelas from "./CardProdutoVrParcelas";
import CardProdutoVrDesconto from "./CardProdutoVrDesconto";
import CardProdutoValor from "./CardProdutoValor";
import CardProdutoAdicionar from "./CardProdutoAdicionar";

const useStyles = makeStyles(() => ({
  card: {
    height: "auto",
    display: "flex",
    flexDirection: "column",
    paddingRight: 5
  },
  cardBoxNoShadow: {
    boxShadow: "none !important"
  },
  cardMedia: {
    display: "block",
    width: "100%",
    height: "auto",
    position: "relative"
  },
  cardContent: {
    top: "auto"
  },
  descricoesContent: {
    top: "auto",
    bottom: 0,
    position: "absolute"
  },
  nomeProduto: {
    color: grey[600],
    fontSize: 11,
    fontWeight: 300
  },
  valorProduto: {
    fontWeight: "bold",
    paddin: 100
  },
  overloadPanel: {
    backgroundColor: "rgba(255,255,255,0.6)",
    position: "relative",
    marginTop: "-120px"
  }
}));

function CardProduto({
  dadosProduto,
  isSelecionado = false,
  onSelecionar,
  produtoAdicionado = false,
  onAddProduto,
  onRemoveProduto
}) {
  const classes = useStyles();
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardBoxNoShadow]: !isSelecionado && !produtoAdicionado
  });

  const overloadPanelClasses = classNames({
    [classes.overloadPanel]: isSelecionado || produtoAdicionado
  });

  const {
    sku,
    imageURL,
    imageTitle,
    nome,
    valor,
    quantidadeParcelas,
    percentualDescontoAvista
  } = dadosProduto;
  const handleOnClickCard = () => onSelecionar(sku);

  return (
    <Card raised={isSelecionado} classes={{ root: cardClasses }}>
      <CardMedia
        className={classes.cardMedia}
        image={imageURL}
        title={imageTitle}
        component="img"
        onClick={handleOnClickCard}
      />
      <div className={overloadPanelClasses}>
        <CardContent
          className={classes.cardContent}
          onClick={handleOnClickCard}
        >
          <Typography
            gutterBottom
            variant="subtitle2"
            className={classes.nomeProduto}
          >
            {nome}
          </Typography>
          <CardProdutoValor valor={valor} />
          <CardProdutoVrParcelas
            valor={valor}
            quantidadeParcelas={quantidadeParcelas}
          />
          <CardProdutoVrDesconto
            valor={valor}
            percentualDescontoAvista={percentualDescontoAvista}
          />
        </CardContent>

        <CardProdutoAdicionar
          visivel={isSelecionado || produtoAdicionado}
          produtoAdicionado={produtoAdicionado}
          fieldName={`produtos.${sku}`}
          onAddProduto={onAddProduto}
          onRemoveProduto={onRemoveProduto}
        />
      </div>
    </Card>
  );
}

CardProduto.propTypes = {
  dadosProduto: PropTypes.object,
  isSelecionado: PropTypes.bool,
  onSelecionar: PropTypes.func,
  produtoAdicionado: PropTypes.bool,
  onAddProduto: PropTypes.func,
  onRemoveProduto: PropTypes.func
};

export default CardProduto;
