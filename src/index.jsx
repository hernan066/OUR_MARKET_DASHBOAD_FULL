import ReactDOM from "react-dom/client";
import "./index.css";

import { HashRouter } from "react-router-dom";
import { MaterialUIControllerProvider } from "./context";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./reduxToolkit/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HashRouter>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </HashRouter>
  </Provider>
);
