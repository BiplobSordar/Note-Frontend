import { useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate();

  


const handleSubmit = async (e) => {
  setLoading(true)
  e.preventDefault();

  if (!username || !password){
    setLoading(false)
 return;
  }

  try {
    const res = await API.post("/auth/login", { username, password });
    login(res.data.token);
    setLoading(false)
    toast.success("Login Successful");
    
    navigate("/");
  } catch (err) {
    setLoading(false)
    console.log(err);

   
    if (err.response) {
   
      console.error("Backend Error", err.response.data);
      toast.error(err.response.data.message || "Invalid credentials");
    } else if (err.request) {
     
      console.error("Network Error", err.message);
      toast.error("Network error. Please try again.");
    } else {
      
      console.error("Error", err.message);
      toast.error("Something went wrong.");
    }
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder=" "
              className="peer w-full border-b-2 border-gray-300 focus:border-indigo-500 outline-none py-2 text-gray-800"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className="absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all">
              Username
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder=" "
              className="peer w-full border-b-2 border-gray-300 focus:border-indigo-500 outline-none py-2 text-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all">
              Password
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
          >
           {loading?  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>:'Login'} 
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-600 font-medium hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
