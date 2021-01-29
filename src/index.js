import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
 
import "@fontsource/roboto";

import store from './store';
import App from "./App";
import theme from './styles/theme';

import firebase, {FbaseContext} from "./services/Firebase"

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <FbaseContext.Provider value = {new firebase()}>
          <App />
        </FbaseContext.Provider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();