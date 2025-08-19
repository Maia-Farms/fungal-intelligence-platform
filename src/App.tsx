import { Routes, Route } from "react-router-dom";
import Site from "./pages/Site";
import Header from "./components/Header";
import Reactor from "./pages/Reactor";

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Site />} />
      <Route path="/reactor" element={<Reactor />} />
    </Routes>
    </>);
}

export default App;
