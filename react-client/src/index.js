import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

import { CssBaseline } from '@nextui-org/react';




ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline/>

      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
