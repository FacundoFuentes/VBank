import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

import { CssBaseline } from '@nextui-org/react';

import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import languageDetector from "i18next-browser-languagedetector";
import global_es from "./translations/es/global.json";
import global_en from "./translations/en/global.json";


i18next
.use(languageDetector)

.init({     
  interpolation: { escapeValue: false }, 
  resources: { 
  en: { global: global_en },
  es: { global: global_es },
  
},
});
  
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
     <I18nextProvider i18n={i18next}>
      <CssBaseline/>
      <App />
   </I18nextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

