import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PopularGames from "./pages/PopularGames";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/popular" element={<PopularGames />} />
    </Routes>
  );
}

export default App;
