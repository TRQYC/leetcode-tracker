import logo from "./logo.svg";
import "./App.css";
import {
  createBrowserRouter,
  Routes,
  Route,
  Link,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import Auth from "./routes/AuthPage";
import AuthContext from "./shared/context/auth-context";
import useAuth from "./shared/hooks/auth-hook";
import DashBoardPage from './routes/dashboard/DashboardPage';
import User from "./routes/user";
import Todo from './routes/todolist';
import FormTest from "./routes/form";
import LoginPage from './routes/Login';
import Sync from './routes/sync';
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
        path: "/todo",
        element: <Todo />,
      },
      {
        path: "/form",
        element: <FormTest></FormTest>
      },
      {
        path: "/sync",
        element: <Sync></Sync>
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>
      },
      {
        path: "/logout",
        element: <LoginPage></LoginPage>
      }
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
