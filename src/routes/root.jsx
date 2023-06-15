import { Link, Outlet } from "react-router-dom";
import AuthContext from "../shared/context/auth-context";
import { useContext } from "react";

export default function Root() {
  const auth = useContext(AuthContext);
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <nav>
          <ul>
              {!auth.isLoggedIn && <li> <Link to={`auth`}>Login</Link></li>}
            <li>
              <Link to={`/dashboard`}>Dashboard</Link>
            </li>
            {auth.isLoggedIn && (
              <li>
                <Link to={`/user`}>User</Link>
              </li>
            )}
            {auth.isLoggedIn && (
              <li>
                <Link onClick={auth.logout}>Logout</Link>
              </li>
            )}
            <li>
              <Link to={`/login`}>TestLogin</Link>
            </li>
             
          </ul>
        </nav>
      </div>
      <div id="detail">
        <p>Leetcode Tracker Tutorial , here is how to use this website</p>
      </div>
      <div id="detail">
        <Outlet />
      </div>
      <div id="detail"></div>
    </>
  );
}
