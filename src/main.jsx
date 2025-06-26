import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from "./store/store.js";
import { Provider } from "react-redux";
import { pcaInstance } from "./authConfig.js";
import { MsalProvider, useIsAuthenticated } from "@azure/msal-react";
import { EventType } from "@azure/msal-browser";
import { PersistGate } from "redux-persist/integration/react";
pcaInstance.initialize();
ReactDOM.createRoot(document.getElementById("root")).render(
 
  <Provider store={store}>
    <PersistGate  persistor={persistor}>
      <MsalProvider instance={pcaInstance}>
        <App />
      </MsalProvider>
    </PersistGate>
  </Provider>

);
