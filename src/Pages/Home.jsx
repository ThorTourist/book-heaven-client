import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../Context/AuthContext";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    let mounted = true;
    axios
      .get(
        `${import.meta.env.VITE_API_URL || "https://book-heaven-tawny.vercel.app"}/all-books`
      )
      .then((res) => {
        if (!mounted) return;
        const sorted = res.data.sort((a, b) => {
          const da = new Date(a.createdAt || a._id);
          const db = new Date(b.createdAt || b._id);
          return db - da;
        });
        setBooks(sorted);
      })
      .catch((err) => console.error("Failed to load books:", err))
      .finally(() => setLoading(false));
    return () => (mounted = false);
  }, []);

  // Helper: get books for a genre
  const getBooksByGenre = (genre, limit = 3) =>
    books.filter((b) => b.genre === genre).slice(0, limit);

  const topGenres = ["Fantasy", "Mystery", "Non-Fiction", "Romance"];

  return (
    <div className="px-4 md:px-8 lg:px-16">
      {/* Latest Books */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Latest Books</h2>
        {loading ? (
          <div className="flex justify-center py-8">
            <ClipLoader size={40} />
          </div>
        ) : books.length === 0 ? (
          <p>No books yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.slice(0, 6).map((b) => (
              <div key={b._id} className="border rounded-lg p-4 shadow-sm">
                <img
                  src={b.coverImage || "/placeholder.png"}
                  alt={b.title}
                  className="h-44 w-full object-cover rounded-md mb-3"
                />
                <h3 className="font-semibold">{b.title}</h3>
                <p className="text-sm text-gray-600">{b.author}</p>
                <p className="text-sm text-gray-500">
                  {b.genre} • Rating: {b.rating || "—"}
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <Link
                    to={`/book-details/${b._id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                  <span className="text-xs text-gray-400">
                    {new Date(b.createdAt || b._id).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Top Genres with books */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Top Genres</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topGenres.map((g) => {
            const genreBooks = books.filter((b) => b.genre === g);
            const book = genreBooks[0]; // only the first book
            return (
              <div
                key={g}
                className="rounded-lg overflow-hidden shadow-sm p-4 bg-white"
              >
                <h4 className="font-semibold text-lg mb-2">{g}</h4>
                {book ? (
                  <Link to={`/book-details/${book._id}`} className="block">
                    <img
                      src={book.coverImage || "/placeholder.png"}
                      alt={book.title}
                      className="h-44 w-full object-cover rounded-md mb-2"
                    />
                    <p className="text-sm font-medium">{book.title}</p>
                    <p className="text-xs text-gray-500">{book.author}</p>
                  </Link>
                ) : (
                  <p className="text-sm text-gray-500">
                    No books in this genre yet.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* About */}
      <section className="mt-12 mb-12">
        <h2 className="text-2xl font-semibold mb-4">About The Book Heaven</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-gray-700">
            The Book Heaven is a community-driven library where readers can add,
            review and share books. Built with React, Firebase Auth and MongoDB
            Atlas.
          </p>
          <div className="mt-4">
            <Link to="/allbooks" className="text-blue-600 hover:underline">
              Explore all books →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
