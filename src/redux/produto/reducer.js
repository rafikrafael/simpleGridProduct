import createReducer from "../createReducer";
import actions from "./actions";

const initialState = {
  produtoSelecionado: {},
  listaProdutos: [],
  isLoadingProdutos: false
};

export default createReducer(initialState, {
  [actions.PRODUTO_SET_STATE](state, action) {
    return {
      ...state,
      ...action.payload
    };
  },
  [actions.PRODUTO_LOAD_PRODUTOS](state, action) {
    return {
      ...state,
      listaProdutos: action.payload,
      isLoadingProdutos: false
    };
  },
  [actions.PRODUTO_SET_IS_LOADING_PRODUTOS](state, action) {
    return {
      ...state,
      isLoadingProdutos: action.payload
    };
  },
});
