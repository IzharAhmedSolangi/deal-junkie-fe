import Routing from "./routing/Routing";
import "./App.css";
import "./styles/globals.css";
import "aos/dist/aos.css";
import { GlobalProvider } from "./context/GlobalContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <GlobalProvider>
        <Routing />
      </GlobalProvider>
    </>
  );
}

export default App;
