import React, { useState, useEffect } from 'react';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import MainPage from "./components/userNotLogged/MainPage/MainPage";
import LoginPage from "./components/userNotLogged/LoginPage/LoginPage";
import RegisterPage from "./components/userNotLogged/RegisterPage/RegisterPage";
import ChangePassword from "./components/userNotLogged/ChangePassword/ChangePassword";
import WelcomePage from "./components/userNotLogged/WelcomePage/WelcomePage";
import InstytucjeKulturalne from "./components/userNotLogged/InstytucjeKulturalne/InstytucjeKulturalne"; 
import CentraKulturalne from "./components/userNotLogged/CentraKulturalne/CentraKulturalne"; 
import CentraNaukowe from './components/userNotLogged/CentraNaukowe/CentraNaukowe';
import MiejscaRekreacyjne from './components/userNotLogged/MiejscaRekreacyjne/MiejscaRekreacyjne';
import MiejscaReligijne from './components/userNotLogged/MiejscaReligijne/MiejscaReligijne';
import MiejscaHistoryczne from './components/userNotLogged/MiejscaHistoryczne/MiejscaHistoryczne';
import NotLoggedNav from './components/userNotLogged/NotLoggedNav/NotLoggedNav';
import ResetPassword from './components/userNotLogged/ResetPassword/resetPassword';
import ForgotPassword from './components/userNotLogged/ForgotPassword/forgotPassword';
import ConfirmAccount from './components/userNotLogged/ConfirmAccount/ConfirmAccount';
import LoggedNav from './components/userLogged/LoggedNav/LoggedNav';
import AdminPanel from './components/adminLogged/AdminPanel/AdminPanel';
import ImageSystem from './components/userNotLogged/ImageSystem/ImageAddingSystem';
import LocationFunction from './components/userNotLogged/ImageSystem/Location'
import AddAnnounces from './components/adminLogged/AddAnnounces/AddAnnounces'
import "./App.css";
import Annouces from './components/userNotLogged/Announces/Announces'
import UserPanel from './components/userLogged/UserPanel/UserPanel';
import AddPost from './components/adminLogged/addPost/addPost';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const PrivateRoute = ({ element, roles }) => {
    const token = localStorage.getItem("token");
    const rolesString = localStorage.getItem("role");
    const userRoles = rolesString ? rolesString.split(',') : [];

    if (!token) {
      return <Navigate to="/login" />;
    }

    if (roles.includes("Admin") && !userRoles.includes("Admin")) {
      return <Navigate to="/user-panel" />;
    }

    if (roles.includes("User") && userRoles.includes("Admin")) {
      return <Navigate to="/admin-panel" />;
    }

    return element;
  };

  const router = createBrowserRouter([
    {
      element: isLoggedIn ? <LoggedNav /> : <NotLoggedNav />,
      children: [
        { path: "/", element: <MainPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/register", element: <RegisterPage /> },
        { path: "/changepassword", element: <ChangePassword /> },
        { path: "/welcomepage", element: <WelcomePage /> },
        { path: "/instytucje-kulturalne", element: <InstytucjeKulturalne /> },
        { path: "/centra-kulturalne", element: <CentraKulturalne /> },
        { path: "/centra-naukowe", element: <CentraNaukowe /> },
        { path: "/miejsca-rekreacyjne", element: <MiejscaRekreacyjne /> },
        { path: "/miejsca-religijne", element: <MiejscaReligijne /> },
        { path: "/miejsca-historyczne", element: <MiejscaHistoryczne /> },
        { path: "/forgot-password", element: <ForgotPassword /> },
        { path: "/reset-password", element: <ResetPassword /> },
        { path: "/confirm-account", element: <ConfirmAccount /> },
        { path: "/add-event", element: <PrivateRoute element={<AddAnnounces />} roles={['Admin']} /> },
        { path: "/add-post", element: <PrivateRoute element={<AddPost />} roles={['Admin']} /> },
        { path: "/admin-panel", element: <PrivateRoute element={<AdminPanel />} roles={['Admin']} /> },
        { path: "/user-panel", element: <PrivateRoute element={<UserPanel />} roles={['User']} /> },
        { path: "/events", element: <Annouces /> },
        { path: "/image-system", element:  <PrivateRoute element={<ImageSystem/>} roles={['Admin']} /> },
        { path: "/map", element: <LocationFunction/>}
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
