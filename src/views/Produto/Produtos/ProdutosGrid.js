import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import grey from "@material-ui/core/colors/grey";
import { makeStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";

import CardProduto from "./CardProduto/CardProduto";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  headerLabel: {
    color: grey[600],
    fontWeight: "bold"
  },
  divider: {
    marginTop: 15,
    marginBottom: 15
  },
  produtoContainer: {
    marginTop: 10
  }
}));

function ProdutosGrid({
  meta,
  listaProdutos = [],
  onAddProduto,
  onRemoveProduto,
  produtosSelecionados = {}
}) {
  const classes = useStyles();
  const [produtoSelecionado, setProdutoSelecionado] = React.useState(null);

  const { error, invalid, submitFailed } = meta;
  const handleSelecionarProduto = sku =>
    setProdutoSelecionado(setProdutoSelecionado =>
      setProdutoSelecionado === sku ? null : sku
    );

  const handleAddProduto = sku => () => {
    onAddProduto(sku);
  };

  const handleOnRemoveProduto = sku => () => {
    onRemoveProduto(sku);
    handleSelecionarProduto(sku);
  };

  return (
    <>
      <Typography variant="subtitle1" className={classes.headerLabel}>
        Produtos
      </Typography>
      <Divider className={classes.divider} />
      <GridContainer spacing={2} className={classes.produtoContainer}>
        {listaProdutos.map(produto => (
          <GridItem key={produto.sku} xs={12} sm={4} md={3} lg={3}>
            <CardProduto
              dadosProduto={produto}
              produtoAdicionado={!!get(produtosSelecionados, `${produto.sku}`)}
              isSelecionado={produtoSelecionado === produto.sku}
              onSelecionar={handleSelecionarProduto}
              onAddProduto={handleAddProduto(produto.sku)}
              onRemoveProduto={handleOnRemoveProduto(produto.sku)}
            />
          </GridItem>
        ))}
      </GridContainer>
      {submitFailed && invalid && (
        <FormHelperText error={true}>{error}</FormHelperText>
      )}
    </>
  );
}

ProdutosGrid.propTypes = {
  listaProdutos: PropTypes.array,
  fields: PropTypes.any,
  meta: PropTypes.object,
  onAddProduto: PropTypes.func,
  onRemoveProduto: PropTypes.func,
  produtosSelecionados: PropTypes.object
};

export default ProdutosGrid;
