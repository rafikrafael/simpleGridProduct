import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import ProdutoReducer from "./produto/reducer";
import CompraFinalizadaReducer from "./compraFinalizada/reducer";

const rootReducer = combineReducers({
  form: formReducer,
  produto: ProdutoReducer,
  compraFinalizada: CompraFinalizadaReducer
});

export default rootReducer;
