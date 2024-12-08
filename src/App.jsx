import React, { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login';
import Layout from './Layout';
import ContactPage from './pages/contact';
import Home from './components/home';
import BookPage from './pages/book';
import RegisterPage from './pages/register';

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>404 Not found</div>,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/contact",
          element: <ContactPage />,
        },
        {
          path: "/book",
          element: <BookPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
