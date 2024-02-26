import "./styles.css";

import { ToastContainer } from "react-toastify";

import { BookingsProvider } from "./context/bookings";
import Home from "./pages/Home";

export default function App() {
  return (
    <BookingsProvider>
      <Home />
      <ToastContainer />
    </BookingsProvider>
  );
}
