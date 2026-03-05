import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewReleases from "./pages/NewReleases";
import PopularGames from "./pages/PopularGames";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/popular" element={<PopularGames />} />
      <Route path="/releases" element={<NewReleases />} />
    </Routes>
  );
}

export default App;
