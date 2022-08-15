import * as React from 'react';
import {
  IconButton, MenuItem, Toolbar,
  AppBar, Avatar, Tooltip, Link, Menu, Box
}
  from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { nav } from './theme/AppBarTheme'
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';

import { useState, useEffect } from 'react'
import { getAxios } from '../utils/axios'
import { tokenExist } from '../utils/tokenHandler'

const ResponsiveAppBar = (props) => {

  const navigate = useNavigate()
  const [inputs, setInputs] = useState([])
  const [anchorElUser, setAnchorElUser] = useState(null);
  const Endpoint = "http://192.168.1.125:8080/notify"


  const getNotify = async () => {
    if (tokenExist()) {
      const { data } = await getAxios(Endpoint)
      setInputs(data.inbox) 
    }
  }
  console.log(inputs);

  useEffect(() => {
    getNotify()
  }, [])


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
    navigate(0)
  }

  return (
    <ThemeProvider theme={nav}>
      <Box>
        <AppBar
          sx={{
            borderBottom: 1,
            boxShadow: 'none',
            borderColor: "#393A3B",
          }}>
          <Toolbar sx={{ my: -0.55, mx: -1 }} >
            <Box sx={{ flexGrow: 0.01 }}>
              <Link href='/'>
                <Avatar
                  alt="logo" src="/images/logo.jpg"
                  sx={{
                    bgcolor: '#3A3B3C',
                    width: 40, height: 40
                  }} />
              </Link>
            </Box>

            {/* search */}
            <Box sx={{ flexGrow: 0.04 }}>
              <Tooltip title="Search">
                <Link href='/search'>
                  <Avatar sx={{
                    bgcolor: '#3A3B3C',
                    width: 40, height: 40
                  }}>
                    <SearchIcon sx={{ color: '#B0B3B8' }} />
                  </Avatar>
                </Link>
              </Tooltip>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }} />

            {/* Menu */}
            {props.name === '' ? null : <Box sx={{ flexGrow: 0.01 }}>
              <Tooltip title="Menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{
                    bgcolor: '#3A3B3C',
                    width: 40, height: 40
                  }}>
                    <AppsIcon />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Link href="/setting" underline="none" color="inherit">
                  <MenuItem>My Account</MenuItem>
                </Link>
                <Link href="/store" underline="none" color="inherit">
                  <MenuItem>My Store</MenuItem>
                </Link>
                <Link href="/chat" underline="none" color="inherit">
                  <MenuItem>Inbox</MenuItem>
                </Link>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </Box>}

            {!props.name ? null : <Box sx={{ flexGrow: 0.01 }}>
              <Tooltip title="Notifications">
                <IconButton sx={{ p: 0 }}>
                  <Avatar sx={{
                    bgcolor: '#3A3B3C',
                    width: 40, height: 40
                  }}>
                    <NotificationsIcon />
                    {inputs.length}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>}

            <Link href="/setting" underline="none" color="inherit">
              <Box sx={{ flexGrow: 0.01 }}>
                <Tooltip title="Your Profile">
                  <IconButton sx={{ p: 0 }}>
                    <Avatar alt={props.name} src={props.avatar}
                      sx={{
                        bgcolor: '#3A3B3C',
                        width: 40, height: 40
                      }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Link>

          </Toolbar>
        </AppBar >
      </Box>
    </ThemeProvider>
  );
};
export default ResponsiveAppBar;
