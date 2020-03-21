import ProdutosMock from "./ProdutosMock.json";

const actions = {
  PRODUTO_SET_STATE: "produto/set_state",
  PRODUTO_LOAD_PRODUTOS: "produto/load_produtos",
  PRODUTO_SET_IS_LOADING_PRODUTOS: "produto/is_loading_produtos"
};

export default actions;

export const loadListaProdutos = () => async dispatch => {
  return new Promise(resolve => {
    dispatch({
      type: actions.PRODUTO_SET_IS_LOADING_PRODUTOS,
      payload: true
    });
    setTimeout(() => {
      return resolve(
        dispatch({
          type: actions.PRODUTO_LOAD_PRODUTOS,
          payload: ProdutosMock
        })
      );
    }, 1000);
  });
};
