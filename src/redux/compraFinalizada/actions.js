const actions = {
  COMPRA_FINALIZADA_SET_STATE: "compra_finalizada/set_state",
  COMPRA_FINALIZADA_EFETIVAR: "compra_finalizada/efetiver",
  COMPRA_FINALIZADA_LIMPAR: "compra_finalizada/limpar"
};

export default actions;

export const efetivarCompra = (dadosCompra, callback) => dispatch => {
  dispatch({
    type: actions.COMPRA_FINALIZADA_EFETIVAR,
    payload: dadosCompra
  });
  if (callback) callback();
};

export const limparCompra = () => dispatch =>
  dispatch({
    type: actions.COMPRA_FINALIZADA_LIMPAR
  });
