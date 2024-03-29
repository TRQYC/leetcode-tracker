import { useContext } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../shared/context/auth-context";

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
        <Button color="inherit" component={RouterLink} to="/studyplan"> StudyPlan</Button>
        {!auth.isLoggedIn && <Button color="inherit" component={RouterLink} to="/auth"> Login</Button>}
        <Button color="inherit" href='https://kindhearted-breeze-13b.notion.site/LeetcodeTracker-Tutorial-f4a5614c17644254815edd1d5b975c45?pvs=4' target="_blank" > Tutorial</Button>
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
                <MenuItem color="inherit" component={RouterLink} to="/sync" onClick={handleClose}>Sync Practices</MenuItem>
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
