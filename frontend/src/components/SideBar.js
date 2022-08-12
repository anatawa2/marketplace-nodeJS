
import DraftsIcon from '@mui/icons-material/Drafts';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import NotificationsIcon from '@mui/icons-material/Notifications';

import {
  Typography, List, ListItemText, ListItemIcon,
  ListItemButton, TextField, InputAdornment, Button,
  Avatar, Box, Stack,
}
  from '@mui/material';

import { categories } from '../utils/categories'

function SideBar() {

  return (
    <>
      <Stack
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'relative',
          borderRight: 1,
          borderColor: "#393A3B",
        }}>
        <Box
          sx={{
            position: 'relative',
            m: 1,
            pt: 1,
            borderBottom: 1,
            borderColor: '#393A3B',
            bgcolor: '#abc666',
          }}
        >
          <Box sx={{ my: -1, ml: -1 }} >
            <ListItemButton >
              <ListItemText>
                <Typography
                  variant="h5" component="div"
                  sx={{
                    fontWeight: 'bold'
                  }}>
                  Marketplace
                </Typography>
              </ListItemText>
              <ListItemIcon>
                <Avatar
                  sx={{
                    color: '#fff',
                    bgcolor: '#3A3B3C',
                    height: 35,
                    width: 35,
                    ml: 10,
                  }}>
                  <SettingsIcon />
                </Avatar>
              </ListItemIcon>
            </ListItemButton>
          </Box>

          <Box sx={{ my: 2, mx: 1 }}>
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
                    <SearchIcon sx={{
                      color: '#B0B3B8',
                    }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>



        <List dense >

          {menu.map((item, idx) => (
            <ListItemButton href={item.link} key={idx}>
              <ListItemIcon>
                <Avatar sx={{ color: '#fff', bgcolor: '#3A3B3C', }}>
                  {item.icon}
                </Avatar>
              </ListItemIcon>
              <Typography sx={{ fontWeight: 'bold', color: '#D0D2D6' }}>
                {item.value}
              </Typography>
            </ListItemButton>
          ))}

          {/* BUTTON ADD ITEM */}
          <Box sx={{ m: 1, mx: 2 }}>
            <Button
              href="/product/add"
              fullWidth
              sx={{
                borderRadius: 2,
                color: '#2D88FF',
                bgcolor: '#263951',
                py: 1,
              }}
            >
              + Create new listing
            </Button>
          </Box>

          <Box
            sx={{
              mx: 2,
              borderTop: 1,
              borderBottom: 1,
              borderColor: "#393A3B",
            }}>
            <Typography sx={{ mt: 1, ml: 2, color: '#fff' }} variant="h6" component="div">
              Filters
            </Typography>
            <Button fullWidth>
              <Typography sx={{ ml: 1, }} variant="button">
                Bangkok, Thailand
              </Typography>
            </Button>
          </Box>

          <Typography sx={{ my: 1, ml: 2, color: '#fff' }} variant="h6" component="div">
            Categories
          </Typography>


          {categories.map((cate, idx) => (
            <ListItemButton href={cate.icon ? null : '/category/' + cate.value}
              disableTouchRipple={cate.icon ? true : false}
              key={idx} >
              <ListItemIcon>
                {cate.icon &&
                  <Avatar sx={{ color: '#fff', bgcolor: '#3A3B3C', }}>
                    {cate.icon}
                    {/* <StorefrontIcon fontSize='small' /> */}
                  </Avatar>
                }
              </ListItemIcon>
              <Typography sx={{ my: 1, fontWeight: 'bold', color: '#D0D2D6' }}>
                {cate.name}
              </Typography>
            </ListItemButton>
          ))}

        </List>
      </Stack>
    </>
  );
}

const menu = [
  { icon: <StorefrontIcon />, value: 'Browse all', link: '/' },
  { icon: <NotificationsIcon />, value: 'Notifications', link: '' },
  { icon: <DraftsIcon />, value: 'Inbox', link: '' },
  { icon: <ShoppingBagIcon />, value: 'Buying', link: '' },
  { icon: <LocalOfferIcon />, value: 'Selling', link: '' },
]

export default SideBar