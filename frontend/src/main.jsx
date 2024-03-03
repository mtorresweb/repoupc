import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ContextProvider } from "./context/AuthContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Index from "./pages/index/Index.jsx";
import Error from "./pages/error/Error";
import Register from "./pages/register/Register.jsx";
import Request from "./pages/request/Request.jsx";
import User from "./pages/user/User.jsx";
import Requests from "./pages/list/requests/Requests.jsx";
import ProtectRoute from "./components/ProtectRoute";
import Repositories from "./pages/list/repositories/Repositories.jsx";
import CreateProject from "./pages/project/CreateProject";
import Test from "./pages/test/Test";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
  {
    path: "/test",
    element: (
      <ProtectRoute>
        <Test />
      </ProtectRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: "/request",
    element: (
      <ProtectRoute>
        <Request />
      </ProtectRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: "/user",
    element: (
      <ProtectRoute>
        <User />
      </ProtectRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: "/requests/:page?",
    element: (
      <ProtectRoute>
        <Requests />
      </ProtectRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: "/create",
    element: (
      <ProtectRoute>
        <CreateProject />
      </ProtectRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: "/",
    element: (
      <ProtectRoute>
        <Index />
      </ProtectRoute>
    ),
    children: [
      {
        path: "/repositories/:type/:sort/:page?",
        element: <Repositories />,
      },
    ],
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);
