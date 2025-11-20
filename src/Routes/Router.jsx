import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../Layoute/RootLayout";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Home from "../Pages/Home";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import AllBook from "../Pages/AllBook";
import AddBook from "../Pages/AddBook";
import MyBooks from "../Pages/MyBooks";

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
        path: "/allbooks",
        element: <AllBook />,
      },
      {
        path: "/addbook",
        element: <AddBook />,
      },
      {
        path: "/mybooks",
        element: <MyBooks />,
      },
    ],
  },
]);
