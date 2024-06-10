import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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
import DragAndDrop from './components/userNotLogged/ImageSystem/AddImage';
import LocationFunction from './components/userNotLogged/ImageSystem/Location';
import TextFieldSection from './components/userNotLogged/ImageSystem/Comment';
import ImageSystem from './components/userNotLogged/ImageSystem/ImageAddingSystem';
import "./App.css";


const router = createBrowserRouter([
 {
    
    element: <NotLoggedNav />, 
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
      { path: "/forgot-password", element: <ForgotPassword/> },
      { path: "/reset-password", element: <ResetPassword/> },
      { path: "/confirm-account", element: <ConfirmAccount/> },
      { path: "/image-system-drop", element: <DragAndDrop/> },
      { path: "/image-system-location", element: <LocationFunction/> },
      { path: "/image-system-text-field", element: <TextFieldSection/> },
      { path: "/image-system", element: <ImageSystem/>}
    ],
 },
]);

function App() {
 return (
    <div>
      <RouterProvider router={router} />
    </div>
 );
}

export default App;
