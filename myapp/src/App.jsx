import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import EditProfile from "./pages/EditProfile";
import Write from "./pages/Write";
import Footer from "./components/Footer";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/writeblog" element={<Write />} />

      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
