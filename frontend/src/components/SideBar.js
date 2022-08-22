
import DraftsIcon from '@mui/icons-material/Drafts';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import NotificationsIcon from '@mui/icons-material/Notifications';

import {
  TextField, InputAdornment, Button,
  Avatar, Box, Link
}
  from '@mui/material';

import { categories } from '../utils/categories'

function SideBar({ pathname }) {

  return (
    <>
      {/* Marketplace Label */}
      <Box className='sidebarLabel'>

        <Box className='label'>
          Marketplace
          <Link href='/'>
            <Avatar
              sx={{
                mt: 0.5,
                color: '#fff',
                bgcolor: '#3A3B3C',
                height: 40, width: 40,
              }}>
              <SettingsIcon />
            </Avatar>
          </Link>
        </Box>

        {/* search */}
        <Box sx={{ mx: 2, mr: 3 }}>
          <TextField
            sx={{
              borderRadius: 10,
              bgcolor: '#3A3B3C',
              py: 0.6,
              pl: 1.2,
            }}
            fullWidth
            variant="standard"
            placeholder='Search marketplace'
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#B0B3B8' }} />
                </InputAdornment>
              )
            }}
          />
        </Box>

      </Box>

      <Box className='space'></Box>

      {/* Nav */}
      <Box>
        {menu.map((val, idx) => (
          <Link href={val.link} key={idx} underline="none" color="inherit">
            <Box className='listing'
              sx={{ bgcolor: val.link === pathname ? '#3A3B3C' : '' }}>
              <Avatar
                sx={{
                  color: '#fff',
                  bgcolor: (val.link === pathname) ? '#1877F2' : '#4E4F50',
                  height: 40, width: 40,
                }}>
                {val.icon}
              </Avatar>
              <Box className='font'>
                {val.name}
              </Box>
            </Box>
          </Link>
        ))}

        {/* Add Button */}
        <Link href='/product/add' underline="none" >
          <Box className='button'>
            + Create new listing
          </Box>
        </Link>
        <Box className='filter'>
          <Box>
            Filters
          </Box>
          <Button href='#' underline="none" >
            Udon Thani . Within 10 kilometers
          </Button>

        </Box>

        {/* categories*/}
        <Box>
        <Box className='font3'>
            Categories
          </Box>

          {categories?.map((val, idx) => (
            <Link href={val.icon ? null : '/category/' + val.value}
              key={idx} underline="none" color="inherit">

              <Box className={val.icon ? 'icon' : 'listing'}
                sx={{ bgcolor: val.value === pathname ? '#3A3B3C' : '' }}>
                {!val.icon ? null : <Avatar
                  sx={{
                    color: '#fff',
                    bgcolor: '#4E4F50',
                    height: 40, width: 40,
                  }}>
                  {val.icon}
                </Avatar>}
                <Box className={val.icon ? 'font' : 'font2'}>
                  {val.name}
                </Box>
              </Box>

            </Link>
          ))}
        </Box>

      </Box>
    </>
  );
}

const menu = [
  { icon: <StorefrontIcon />, name: 'Browse all', link: '/marketplace' },
  { icon: <NotificationsIcon />, name: 'Notifications', link: '/Notifications' },
  { icon: <DraftsIcon />, name: 'Inbox', link: '/inbox' },
  { icon: <ShoppingBagIcon />, name: 'Buying', link: '' },
  { icon: <LocalOfferIcon />, name: 'Selling', link: '' },
]

export default SideBar