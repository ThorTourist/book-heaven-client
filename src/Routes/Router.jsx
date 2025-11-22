import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../Layoute/RootLayout";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Home from "../Pages/Home";
import AddBook from "../Pages/AddBook";
import Login from "../Pages/Login";
import AllBook from "../Pages/AllBook";

import MyBooks from "../Pages/MyBooks";
import Signup from "../Pages/Signup";
import PrivateRoute from "../Routes/PrivateRoute"; // ✅ added this import only
import BookDetails from "../Pages/BookDetails";
import UpdateBook from "../Pages/UpdateBook";
import AboutUs from "../Pages/AboutUs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/book-details/:id",
        element: <BookDetails></BookDetails>,
      },
      {
        path: "/allbooks",
        element: <AllBook />,
      },
      {
        path: "/books",
        element: <AllBook />,
      },

      // ⛔️ PROTECTED ROUTES START HERE
      {
        path: "/addbook",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },

      {
        path: "/update-book/:id",
        element: (
          <PrivateRoute>
            <UpdateBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/mybooks",
        element: (
          <PrivateRoute>
            <MyBooks />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
