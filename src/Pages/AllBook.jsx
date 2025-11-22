import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router";

const AllBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    axios
      .get(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/all-books`
      )
      .then((res) => {
        if (!mounted) return;
        setBooks(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
    return () => (mounted = false);
  }, []);

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-semibold mb-4">All Books</h2>
      {loading ? (
        <div className="flex justify-center py-8">
          <ClipLoader size={40} />
        </div>
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
                <th>Details</th>
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
                  <td>
                    <Link
                      to={`/book-details/${b._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllBook;
