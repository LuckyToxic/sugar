import { Provider } from "react-redux";
import useDynamicVh from "../shared/hooks/useDynamicVh";
import Router from "./router/Router";
import store from "./store/store";

function App() {
  useDynamicVh();
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
