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
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';

import { useState, useEffect } from 'react'
import { getAxios } from '../utils/axios'
import { tokenExist } from '../utils/tokenHandler'

const ResponsiveAppBar = ({ searchElement }) => {

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [notif, setNotif] = useState()
  const [myUser, setMyUser] = useState({ name: '' })
  const [anchorElUser, setAnchorElUser] = useState(null);

  const Endpoint = "http://192.168.1.125:8080/notify"
  const myEndpoint = "http://192.168.1.125:8080/setting"

  const getMyUser = async () => {
    if (!tokenExist()) return;
    const { data: { user } } = await getAxios(myEndpoint)
    setMyUser(user)
  }

  const getNotify = async () => {
    const { data } = await getAxios(Endpoint)
    setNotif(data.inbox)
  }

  // //fetch every 3 sec  for realtime notify chat
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     //notify
  //     getNotify()
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []) // eslint-disable-line react-hooks/exhaustive-deps  

  useEffect(() => {
    getMyUser()
    getNotify()
  }, [])

  const search = () => {
    if (pathname === '/marketplace') searchElement.current.focus()
    else if (pathname === '/marketplace/notifications') searchElement.current.focus()
    else if (pathname === '/marketplace/inbox') searchElement.current.focus()
    else if (pathname === '/marketplace/search') searchElement.current.focus()
    else return navigate('/marketplace/search')
  }

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
            position: 'fixed',
            borderBottom: 1,
            boxShadow: 'none',
            borderColor: "#393A3B",
          }}>

          <Toolbar sx={{ my: -0.6 }} >
            <Box sx={{ ml: -1, mr: 1 }}>
              <Link href='/marketplace'>
                <Avatar
                  alt="logo" src="/images/logo.jpg"
                  sx={{
                    bgcolor: '#3A3B3C',
                    width: 45, height: 45
                  }} />
              </Link>
            </Box>

            {/* search */}
            <Box>
              <div style={{ cursor: "pointer" }} onClick={() => search()}>
                <Avatar sx={{
                  bgcolor: '#3A3B3C',
                  width: 45, height: 45
                }}>
                  <SearchIcon sx={{ color: '#B0B3B8' }} />
                </Avatar>
              </div>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }} />

            {/* Menu */}
            {myUser.name === '' ? null :
              <Box sx={{ mx: -0.5 }}>
                <Tooltip title="Menu">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar sx={{
                      bgcolor: '#3A3B3C',
                      width: 45, height: 45
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
                  <Link onClick={() => navigate('/marketplace/profile/' + myUser._id)} underline="none" color="inherit">
                    <MenuItem>My Store</MenuItem>
                  </Link>
                  <Link onClick={() => navigate('/messenger/inbox')} underline="none" color="inherit">
                    <MenuItem>Messenger</MenuItem>
                  </Link>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
              </Box>}

            {notif &&
              <div onClick={() => navigate('/marketplace/notifications')} >
                <Box sx={{ mx: -0.5 }}  >
                  <Tooltip title="Notifications">
                    <IconButton >
                      <Avatar sx={{
                        bgcolor: '#3A3B3C',
                        width: 45, height: 45
                      }}>
                        <NotificationsIcon />
                        {notif.length > 0 && notif.length}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
              </div>}

            <div onClick={() => navigate('/setting')}>
              <Box sx={{ mr: -1 }}>
                <Tooltip title="Your Profile">
                  <IconButton >
                    <Avatar alt={myUser.name} src={myUser.avatar}
                      sx={{
                        bgcolor: '#3A3B3C',
                        width: 45, height: 45,
                      }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </div>

          </Toolbar>
        </AppBar >
      </Box >
    </ThemeProvider >
  );
};
export default ResponsiveAppBar;
