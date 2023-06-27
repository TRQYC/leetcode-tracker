import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Auth from "./routes/AuthPage";
import DashBoardPage from './routes/dashboard/DashboardPage';
import Root from "./routes/RootPage";
import StudyPlanDetailPage from './routes/StudyPlanDetailPage';
import StudyPlanListPage from './routes/StudyPlanListPage';
import SyncPracticePage from './routes/SyncPracticePage';
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
        element: <SyncPracticePage />,
      },
      {
        path: "/studyplan/:planId",
        element: <StudyPlanDetailPage />,
      },
      {
        path: "/studyplan",
        element: <StudyPlanListPage />,
      },
    ],
  }
  
]);

// 4️⃣ RouterProvider added
export default function App() {
  const { token, login, logout, userId, site } = useAuth();
  console.log("render App", token, userId)
  return (
    <AuthContext.Provider
    value=
    {{
      isLoggedIn: !!token,
      token: token,
      userId: userId,
      site: site, 
      login: login,
      logout: logout,
    }}
    >
     <RouterProvider router={router} />
    </AuthContext.Provider>
     
  );
}
