import Routing from "./routing/Routing";
import "./App.css";
import "./styles/globals.css";
import { GlobalProvider } from "./context/GlobalContext";

function App() {
  return (
    <>
      <GlobalProvider>
        <Routing />
      </GlobalProvider>
    </>
  );
}

export default App;
