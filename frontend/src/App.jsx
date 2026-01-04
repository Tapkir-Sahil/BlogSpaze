import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import EditProfile from "./pages/EditProfile";
import Write from "./pages/Write";
import Footer from "./components/Footer";
import Landing from "./pages/landing";
import PublicNavbar from "./components/PublicNavbar";
import PrivateNavbar from "./components/PrivateNavbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import SingleBlog from "./pages/SingleBlog";

function App() {
  const { isAuth } = useAuth();

  return (
    <Router>
      {/* Navbar */}
      {isAuth ? <PrivateNavbar /> : <PublicNavbar />}

      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={isAuth ? <Navigate to="/home" /> : <Landing />}
        />
        <Route path="/login" element={isAuth ? <Navigate to="/home" /> : <Login />} />
        <Route path="/register" element={isAuth ? <Navigate to="/home" /> : <Register />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editprofile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/writeblog"
          element={
            <ProtectedRoute>
              <Write />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <ProtectedRoute>
              <SingleBlog />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
