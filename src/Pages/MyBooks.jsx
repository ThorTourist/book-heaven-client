import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import "react-toastify/dist/ReactToastify.css";

const MyBooks = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const token = user ? await user.getIdToken() : null;
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/myBooks`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load your books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [user]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this book?")) return;
    try {
      const token = user ? await user.getIdToken() : null;
      await axios.delete(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:3000"
        }/delete-book/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Book deleted");
      fetchBooks();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  if (loading)
    return (
      <div className="py-8 flex justify-center">
        <ClipLoader size={40} />
      </div>
    );

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-semibold mb-4">My Books</h2>
      {books.length === 0 ? (
        <p>You haven't added any books yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b._id}>
                  <td>
                    <img
                      src={b.coverImage || "/placeholder.png"}
                      alt={b.title}
                      className="w-16 h-20 object-cover rounded"
                    />
                  </td>
                  <td>{b.title}</td>
                  <td>{b.author}</td>
                  <td>{b.genre}</td>
                  <td>{b.rating || "—"}</td>
                  <td className="space-x-2">
                    <Link
                      to={`/update-book/${b._id}`}
                      className="btn btn-sm btn-outline"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(b._1d || b._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default MyBooks;
