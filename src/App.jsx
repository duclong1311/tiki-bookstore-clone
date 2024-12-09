import React, { useEffect, useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { getAccount } from './services/api';
import { doLoginAction } from './redux/account/accountSlice';

export default function App() {

  const dispatch = useDispatch();

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

  useEffect(() => {
    const getAccountData = async () => {
      const res = await getAccount();
      console.log(res.data);
      if (res && res.data) {
        dispatch(doLoginAction(res.data));
      }
    }
    getAccountData();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
