import React from "react";
import { PrimeReactProvider } from "primereact/api";

import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GameContextProvider } from "./context/context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <GameContextProvider>
        <App />
      </GameContextProvider>
    </PrimeReactProvider>
  </React.StrictMode>
);
