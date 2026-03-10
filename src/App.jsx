import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import NewReleases from "./pages/NewReleases";
import PopularGames from "./pages/PopularGames";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SearchResults from "./pages/SearchResults";

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
      </Routes>
    </>
  );
}

export default App;
