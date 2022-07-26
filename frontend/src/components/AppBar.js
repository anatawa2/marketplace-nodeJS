import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AppsIcon from '@mui/icons-material/Apps';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';


import { nav } from './theme/AppBarTheme'
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';


const ResponsiveAppBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);

  };

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    navigate(0)
  }

  return (
    <ThemeProvider theme={nav}>
      <AppBar position="static" sx={{ borderBottom: 1, borderColor: "#393A3B" }}>
        <Container maxWidth="xxl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 0.01 }}>
              <Link href='/'>
                <Avatar alt="logo" src="/images/logo.jpg" />
              </Link>
            </Box>

            {/* search */}
            <Box sx={{ flexGrow: 0.04 }}>
              <Tooltip title="Search">
                <Link href='/search'>
                  <Avatar sx={{ bgcolor: '#3A3B3C' }}>
                    <SearchIcon />
                  </Avatar>
                </Link>
              </Tooltip>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <Box>
                  <Link href="/category">
                    <MenuItem>Category</MenuItem>
                  </Link>
                  <Link href="/store" underline="none" color="inherit">
                    <MenuItem>My Store</MenuItem>
                  </Link>
                </Box>
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                key='category'
                href='/category'
                sx={{ my: 2, color: 'white', display: 'block' }}
              >Category
              </Button>
              <Button
                key='store'
                href='/store'
                sx={{ my: 2, color: 'white', display: 'block' }}
              >My Store
              </Button>
            </Box>

            {/* Menu */}
            {props.name === '' ? null : <Box sx={{ flexGrow: 0.01 }}>
              <Tooltip title="Menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: '#3A3B3C' }}>
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
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </Box>}

            <Box sx={{ flexGrow: 0.01 }}>
              <Tooltip title="Notifications">
                <IconButton sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: '#3A3B3C' }}>
                    <NotificationsIcon />
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>

            <Link href="/setting" underline="none" color="inherit">
              <Box sx={{ flexGrow: 0.01 }}>
                <Tooltip title="Your Profile">
                  <IconButton sx={{ p: 0 }}>
                    <Avatar alt={props.name} src={props.avatar} sx={{ bgcolor: '#3A3B3C' }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Link>

          </Toolbar>
        </Container>
      </AppBar >
    </ThemeProvider>
  );
};
export default ResponsiveAppBar;
