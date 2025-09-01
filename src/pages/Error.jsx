const ErrorPage = ({ message }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-200 to-indigo-300 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center">
        <h1 className="text-6xl font-extrabold text-red-600 mb-6 animate-pulse">
          😓
        </h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Oops!</h2>
        <p className="text-gray-600 mb-6">{message || "Something went wrong."}</p>
        <a
          href="/"
          className="inline-block w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg transition-all"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
