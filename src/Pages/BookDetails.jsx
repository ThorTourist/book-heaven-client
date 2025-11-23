import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../Context/AuthContext";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const fetchBook = async () => {
      try {
        // Send token only if user is logged in
        const token = user ? await user.getIdToken() : null;

        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URL || "https://book-heaven-tawny.vercel.app"
          }/book-details/${id}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );

        if (!mounted) return;
        setBook(res.data);
      } catch (err) {
        console.error(err);

        // Navigate to login only if 401 AND user exists
        if (err.response && err.response.status === 401 && user) {
          navigate("/login");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchBook();
    return () => (mounted = false);
  }, [id, user, navigate]);

  if (loading)
    return (
      <div className="py-8 flex justify-center">
        <ClipLoader size={40} />
      </div>
    );

  if (!book) return <p className="p-4">Book not found.</p>;

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <img
            src={book.coverImage || "/placeholder.png"}
            alt={book.title}
            className="w-full h-64 object-cover rounded"
          />
        </div>
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold">{book.title}</h2>
          <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
          <p className="mb-3">
            <strong>Genre:</strong> {book.genre}
          </p>
          <p className="mb-3">
            <strong>Rating:</strong> {book.rating || "—"}
          </p>
          <p className="mb-4">{book.summary}</p>
          <p className="text-sm text-gray-500">
            Added by: {book.userName || book.userEmail}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
