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
import { useDispatch, useSelector } from 'react-redux';
import { getAccount } from './services/api';
import { doLoginAction } from './redux/account/accountSlice';
import LoadingPage from './pages/loading';
import ErrorPage from './pages/error';
import AdminPage from './pages/admin';
import PrivateRoute from './pages/protected';

export default function App() {
  const dispatch = useDispatch();
  const isUserLogin = useSelector(state => state.account.isAuthenticated);

  useEffect(() => {
    const getAccountData = async () => {
      if (window.location.pathname === '/login')
        return;
      const res = await getAccount();
      if (res && res.data) {
        dispatch(doLoginAction(res.data));
      }
    }
    getAccountData();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
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
      path: "/admin",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true, element:
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>,
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
      {isUserLogin === true || window.location.pathname === '/login' ?
        <RouterProvider router={router} />
        :
        <LoadingPage />
      }
    </>
  );
}
