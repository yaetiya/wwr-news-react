import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CssBaseline, LinearProgress, ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <React.Suspense fallback={<LinearProgress />}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.Suspense>
  </ThemeProvider>,
  document.getElementById("root")
);
