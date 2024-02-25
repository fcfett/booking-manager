import "./styles.css";

import { ToastContainer } from "react-toastify";

import { AppProvider } from "./context";
import Home from "./pages/Home";

export default function App() {
  return (
    <AppProvider>
      <Home />
      <ToastContainer />
    </AppProvider>
  );
}
