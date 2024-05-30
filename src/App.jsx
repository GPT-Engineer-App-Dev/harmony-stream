import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Playlists from "./pages/Playlists.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/playlists" element={<Playlists />} />
      </Routes>
    </Router>
  );
}

export default App;
