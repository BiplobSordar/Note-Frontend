
import { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loadingC, setLoadingC] = useState(false); 
  const [loadingU, setLoadingU] = useState(false);
  const [loadingD, setLoadingD] = useState({}); 

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (err) {
      handleError(err, "Failed to fetch notes");
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      if (editingId) {
        setLoadingU(true);
        await API.put(`/notes/${editingId}`, { title, content });
        toast.success("Note Updated");
      } else {
        setLoadingC(true);
        await API.post("/notes", { title, content });
        toast.success("Note Added");
      }

      setTitle("");
      setContent("");
      setEditingId(null);
      fetchNotes();
    } catch (err) {
      handleError(err, "Failed to save note");
    } finally {
      setLoadingC(false);
      setLoadingU(false);
    }
  };

  const deleteNote = async (id) => {
    setLoadingD((prev) => ({ ...prev, [id]: true }));
    try {
      await API.delete(`/notes/${id}`);
      toast.success("Note Deleted");
      fetchNotes();
    } catch (err) {
      handleError(err, "Failed to delete note");
    } finally {
      setLoadingD((prev) => ({ ...prev, [id]: false }));
    }
  };

 
  const startEditing = (note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  
  const handleError = (err, defaultMsg) => {
    console.error(err);
    if (err.response) {
      toast.error(err.response.data.message || defaultMsg);
    } else if (err.request) {
      toast.error("Network error. Please try again.");
    } else {
      toast.error(defaultMsg);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-indigo-300 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
          My Notes
        </h2>

      
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder=" "
              className="peer w-full border-b-2 border-gray-300 focus:border-indigo-500 outline-none py-2 text-gray-800"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label className="absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all">
              Title
            </label>
          </div>

          <div className="relative">
            <textarea
              placeholder=" "
              className="peer w-full border-b-2 border-gray-300 focus:border-indigo-500 outline-none py-2 text-gray-800 resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={4}
            />
            <label className="absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all">
              Content
            </label>
          </div>

          <button
            type="submit"
            disabled={editingId ? loadingU : loadingC}
            className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {editingId
              ? loadingU
                ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                : "Update Note"
              : loadingC
              ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              : "Add Note"}
          </button>
        </form>

        
        <ul className="space-y-4">
          {notes.map((note) => (
            <li
              key={note.id}
              className="p-4 border rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm hover:shadow-md transition-all bg-gray-50"
            >
              <div className="mb-2 md:mb-0">
                <h3 className="font-bold text-lg">{note.title}</h3>
                <p className="text-gray-700">{note.content}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEditing(note)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-xl transition-all shadow"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="bg-red-500 flex justify-center items-center hover:bg-red-600 text-white px-3 py-1 rounded-xl transition-all shadow"
                  disabled={loadingD[note.id]}
                >
                  {loadingD[note.id]
                    ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    : "Delete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notes;
