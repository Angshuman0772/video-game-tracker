import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import NewReleases from "./pages/NewReleases";
import PopularGames from "./pages/PopularGames";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SearchResults from "./pages/SearchResults";
import GameDetails from "./pages/GameDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/popular" element={<PopularGames />} />
        <Route path="/releases" element={<NewReleases />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
