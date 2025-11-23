import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const AddBook = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    rating: "",
    summary: "",
    coverImage: "", // will store base64 string or URL
  });
  const [loading, setLoading] = useState(false);

  // Handle text input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle manual image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData({ ...formData, coverImage: reader.result });
    };
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return Swal.fire("Error", "You must be logged in!", "error");

    try {
      setLoading(true);
      const idToken = await user.getIdToken(); // Firebase ID token
      const res = await axios.post("https://book-heaven-tawny.vercel.app/add-book", formData, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      Swal.fire("Success", res.data.message, "success");
      setFormData({
        title: "",
        author: "",
        genre: "",
        rating: "",
        summary: "",
        coverImage: "",
      });
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Something went wrong!",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          value={formData.rating}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="summary"
          placeholder="Short Summary"
          value={formData.summary}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        {/* Input for image URL */}
        <input
          type="text"
          name="coverImage"
          placeholder="Paste image URL (optional)"
          value={formData.coverImage}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <p className="text-center my-1 text-gray-500">OR</p>

        {/* File upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full border p-1 hover:bg-amber-100"
        />

        {formData.coverImage && (
          <img
            src={formData.coverImage}
            alt="Preview"
            className="w-32 h-32 object-cover mt-2 mx-auto"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
