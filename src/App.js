import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Auth from "./routes/AuthPage";
import DashBoardPage from './routes/dashboard/DashboardPage';
import Root from "./routes/RootPage";
import Sync from './routes/sync';
import User from "./routes/UserPage";
import AuthContext from "./shared/context/auth-context";
import useAuth from "./shared/hooks/auth-hook";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/dashboard",
        element: <DashBoardPage/>,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/sync",
        element: <Sync></Sync>
      },
    ],
  }
  
]);

// 4️⃣ RouterProvider added
export default function App() {
  const { token, login, logout, userId } = useAuth();
  console.log("render App", token, userId)
  return (
    <AuthContext.Provider
    value=
    {{
      isLoggedIn: !!token,
      token: token,
      userId: userId,
      login: login,
      logout: logout,
    }}
    >
     <RouterProvider router={router} />
    </AuthContext.Provider>
     
  );
}
