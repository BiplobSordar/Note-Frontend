import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
      if(!username&& !password )return
    try {
      console.log(API)
      await API.post("/auth/register", { username, password ,email});
      toast.success('User Register Successfull')
      navigate("/login");
    } catch (err) {
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-400 to-teal-600">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="relative">
            <input
              type="email"
              placeholder=""
              className="peer w-full border-b-2 border-gray-300 focus:border-teal-500 outline-none py-2 text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              
            />
            <label className="absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all">
             Email
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder=" "
              className="peer w-full border-b-2 border-gray-300 focus:border-teal-500 outline-none py-2 text-gray-800"
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
              className="peer w-full border-b-2 border-gray-300 focus:border-teal-500 outline-none py-2 text-gray-800"
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
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-teal-600 font-medium hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
