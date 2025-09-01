import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between">
      <Link  to={'/'} className="px-3 hover:underline"><h1 className="font-bold">Notes App</h1></Link>
      
      <div>
        {user ? (
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="px-3 hover:underline">Login</Link>
            <Link to="/register" className="px-3 hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
