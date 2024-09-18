import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./state/store";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter } from "react-router-dom";
import DogContextProvider from "./components/DogContext";
import { HelmetProvider } from "react-helmet-async";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <DogContextProvider>
          <Provider store={store}>
            <GlobalStyles />
            <App />
          </Provider>
        </DogContextProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
