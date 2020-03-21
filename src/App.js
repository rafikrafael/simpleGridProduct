import React from "react";
import PropTypes from "prop-types";
import { createBrowserHistory } from "history";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { routerMiddleware } from "react-router-redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import ProdutoContainer from "views/Produto/ProdutoContainer";
import CompraFinalizada from "views/CompraFinalizada/CompraFinalizada";
import rootReducer from "./redux/reducers";

const history = createBrowserHistory();
const historyMiddleware = routerMiddleware(history);

const logger = createLogger({
  // ...options
  options: {
    timestamp: true
  }
});

const middlewares = [thunk, historyMiddleware, logger];

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = applyMiddleware(...middlewares)(createStore)(
  rootReducer,
  devTools
);

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route
            path={"/produto"}
            component={ProdutoContainer}
            key={"produto"}
          />
          <Route
            path={"/compra_finalizada"}
            component={CompraFinalizada}
            key={"compra_finalizada"}
            exact
          />
          <Redirect to="/produto" />
        </Switch>
      </Router>
    </Provider>
  );
}

App.propTypes = {};

export default App;
