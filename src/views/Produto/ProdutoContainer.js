import React from "react";
import PropTypes from "prop-types";
import { get, set, omit } from "lodash";
import grey from "@material-ui/core/colors/grey";
import Container from "@material-ui/core/Container";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProdutosGrid from "./Produtos/ProdutosGrid";
import DadosCliente from "./DadosCliente/DadosCliente";
import ProdutoFooter from "./Footer/ProdutoFooter";
import { loadListaProdutos } from "../../redux/produto/actions";
import { efetivarCompra } from "../../redux/compraFinalizada/actions";
import LoadingPage from "components/Backdrop/LoadingPage";

import { validate } from "./fieldsValidate";

const styles = theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  headerLabel: {
    color: grey[600]
  },
  divider: {
    marginTop: 15,
    marginBottom: 15
  },
  produtoContainer: {
    marginTop: 10
  }
});

class ProdutoContainerForm extends React.Component {
  componentDidMount() {
    this.props.loadListaProdutos();
  }

  doSubmit = values => {
    const { history, efetivarCompra } = this.props;
    const goToCompraFinalizada = () => history.push("/compra_finalizada");
    efetivarCompra(
      {
        ...values,
        valorTotal: this.getValorTotal(values.produtos)
      },
      goToCompraFinalizada
    );
  };

  handleAddProduto = sku => {
    const { change, listaProdutos, produtosSelecionados = {} } = this.props;
    const produto = listaProdutos.find(p => p.sku === sku);
    const { valor } = produto;
    const _produtosSelecionados = {
      ...produtosSelecionados,
      [sku]: { sku, valor, quantidade: 1 }
    };
    change("produtos", _produtosSelecionados, true);
  };

  handleRemoveProduto = sku => {
    const { change, produtosSelecionados = {} } = this.props;
    change("produtos", omit(produtosSelecionados, [sku]), true);
  };

  getValorTotal = (produtos = {}) => {
    let valorTotal = 0;
    for (const key of Object.keys(produtos)) {
      const produto = get(produtos, `${key}`);
      if (produto) {
        const quantidade = Number(get(produto, "quantidade", 0));
        const valor = Number(get(produto, "valor", 0));
        valorTotal += Number(quantidade * valor);
      }
    }
    return valorTotal;
  };

  render() {
    const {
      classes,
      listaProdutos,
      isLoadingProdutos,
      handleSubmit,
      pristine,
      submitting,
      produtosSelecionados
    } = this.props;
    return (
      <Container className={classes.cardGrid} maxWidth="md">
        <form onSubmit={handleSubmit(this.doSubmit)}>
          <Field
            name="produtos"
            component={ProdutosGrid}
            listaProdutos={listaProdutos}
            onAddProduto={this.handleAddProduto}
            onRemoveProduto={this.handleRemoveProduto}
            produtosSelecionados={produtosSelecionados}
          />
          <DadosCliente />
          <ProdutoFooter
            valorTotal={this.getValorTotal(produtosSelecionados)}
            disableSubmit={pristine || submitting}
          />
        </form>
        <LoadingPage visivel={isLoadingProdutos} />
      </Container>
    );
  }
}

ProdutoContainerForm.propTypes = {
  classes: PropTypes.object,
  loadListaProdutos: PropTypes.func,
  listaProdutos: PropTypes.array,
  isLoadingProdutos: PropTypes.bool,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  change: PropTypes.func,
  efetivarCompra: PropTypes.func,
  produtosSelecionados: PropTypes.object,
  history: PropTypes.object
};

const valueSelector = formValueSelector("produtoForm");

const mapStateToProps = state => ({
  listaProdutos: state.produto.listaProdutos,
  isLoadingProdutos: state.produto.isLoadingProdutos,
  produtosSelecionados: valueSelector(state, "produtos")
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadListaProdutos,
      efetivarCompra
    },
    dispatch
  );

const ProdutoContainer = reduxForm({
  form: "produtoForm",
  validate
})(ProdutoContainerForm);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(ProdutoContainer))
);
