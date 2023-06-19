import { Link, Outlet } from "react-router-dom";
import AuthContext from "../shared/context/auth-context";
import { useContext } from "react";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Link as RouterLink } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
function Root() {
  const auth = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
     <Box sx={{ display: 'flex' }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
        >
        </IconButton>
        <Button color="inherit" component={RouterLink} to="/dashboard"> Dashboard</Button>
        {!auth.isLoggedIn && <Button color="inherit" component={RouterLink} to="/auth"> Login</Button>}
        {auth.isLoggedIn && (
           <Box sx={{ ml: 'auto' }}>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => {
                  handleClose()
                  auth.logout()}}>LogOut</MenuItem>
                <MenuItem color="inherit" component={RouterLink} to="/user" onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
            </Box>)
            }
      </Toolbar>
    </AppBar>
    </Box>
        <div id="detail">
          <Outlet />
        </div>
        <div id="detail"></div>
        </>
  );
}
export default Root;


 function ResponsiveAppBar() {
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
        <Outlet />
      </div>
      <div id="detail"></div>
    </>
  );
}
