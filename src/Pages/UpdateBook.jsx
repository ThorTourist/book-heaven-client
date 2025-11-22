import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import "react-toastify/dist/ReactToastify.css";

const UpdateBook = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load book data
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const token = user ? await user.getIdToken() : null;
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URL || "http://localhost:3000"
          }/book-details/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!mounted) return;
        setBook(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load book");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => (mounted = false);
  }, [id, user]);

  // Handle input changes
  const handleChange = (e) =>
    setBook({ ...book, [e.target.name]: e.target.value });

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = user ? await user.getIdToken() : null;

      // Only send editable fields
      const updatedData = {
        title: book.title,
        author: book.author,
        genre: book.genre,
        rating: book.rating,
        summary: book.summary,
        coverImage: book.coverImage,
      };

      await axios.put(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:3000"
        }/update-book/${id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Book updated successfully");
      navigate("/mybooks");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  if (loading)
    return <div className="py-8 flex justify-center">Loading...</div>;
  if (!book) return <div className="p-4">Book not found</div>;

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Update Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={book.title || ""}
          onChange={handleChange}
          className="input w-full"
          required
        />
        <input
          name="author"
          value={book.author || ""}
          onChange={handleChange}
          className="input w-full"
          required
        />
        <input
          name="genre"
          value={book.genre || ""}
          onChange={handleChange}
          className="input w-full"
          required
        />
        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          value={book.rating || ""}
          onChange={handleChange}
          className="input w-full"
        />
        <textarea
          name="summary"
          value={book.summary || ""}
          onChange={handleChange}
          className="textarea w-full"
        />
        <input
          name="coverImage"
          value={book.coverImage || ""}
          onChange={handleChange}
          className="input w-full"
        />
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateBook;
