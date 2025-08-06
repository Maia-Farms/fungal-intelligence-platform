import { Routes, Route } from "react-router-dom";
import Site from "./pages/Site";
import Header from "./components/Header";

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Site />} />
    </Routes>
    </>);
}

export default App;
