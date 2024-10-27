import Header from "./components/Header/Header";
import CreateProfile from "./components/pages/CreateProfile";
import Home from "./components/pages/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<CreateProfile />} />
      </Routes>
    </>
  );
}

export default App;
