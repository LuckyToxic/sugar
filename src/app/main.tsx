import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import "@ant-design/v5-patch-for-react-19";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/sugar/">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
