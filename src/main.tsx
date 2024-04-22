import ReactDOM from "react-dom/client";
import AppRouter from "@routes/AppRouter";
// styles
import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/global.css";
// api axios
import "./services/axios-global";
// redux
import { Provider } from "react-redux";
import { store, persistor } from "@store/index"; // make sure to export 'persistor' from your store
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
