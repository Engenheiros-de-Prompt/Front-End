import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Badge from "./pages/Badge";
import Feedback from "./pages/Feedback";
import ChooseUserPage from "./pages/ChooseUserPage";
import FeedbackSuccessPage from "./pages/FeedbackSuccessPage";
import PerfilPage from "./pages/PerfilPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/chooseUser", element: <ChooseUserPage /> },
  { path: "/feedback", element: <Feedback /> },
  { path: "/badge", element: <Badge /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/feedback-succes", element: <FeedbackSuccessPage /> },
  { path: "/perfil", element: <PerfilPage /> },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;
