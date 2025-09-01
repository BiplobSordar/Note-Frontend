import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import LoadingRing from "./components/Loading";
import ErrorPage from "./pages/Error";

const PrivateRoute = ({ children }) => {
 const { user, loading } = useContext(AuthContext);

  if (loading) return <LoadingRing/>
  return user ? children : <Navigate to="/login" />;
};




function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Notes />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
