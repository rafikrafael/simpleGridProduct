import createReducer from "../createReducer";
import actions from "./actions";

const initialState = {
  compraEfetivada: null
};

export default createReducer(initialState, {
  [actions.COMPRA_FINALIZADA_SET_STATE](state, action) {
    return {
      ...state,
      ...action.payload
    };
  },
  [actions.COMPRA_FINALIZADA_EFETIVAR](state, action) {
    return {
      ...state,
      compraEfetivada: action.payload
    };
  },
  [actions.COMPRA_FINALIZADA_LIMPAR](state) {
    return {
      ...state,
      compraEfetivada: null
    };
  }
});
