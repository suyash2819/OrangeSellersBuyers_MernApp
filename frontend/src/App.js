import { Provider } from "react-redux";
import Navigate from "./Components/Navigation";
import Header from "./Components/Header";
import store from "./Store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Navigate />
      </Provider>
    </>
  );
}

export default App;
