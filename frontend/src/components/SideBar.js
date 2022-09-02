import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import DraftsIcon from '@mui/icons-material/Drafts';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import NotificationsIcon from '@mui/icons-material/Notifications';

import {
  TextField, InputAdornment, Button,
  Avatar, Box, Radio,
}
  from '@mui/material';

import { categories } from '../utils/categories'

import styles from './css/view.module.css';
import filter from './css/filter.module.css';

function SideBar({ pathname, slug, auto, searchElement }) {

  const navigate = useNavigate()
  const [search, setSearch] = useState(slug)
  const [checked, setChecked] = useState('All')
  const [minPrice, setMinPrice] = useState()
  const [maxPrice, setMaxPrice] = useState()

  const onSearch = () => {
    let path
    if (search) path = `/marketplace/query?name=${search}`
    if (checked) path += `&condition=${checked}`
    if (minPrice) path += `&minPrice=${minPrice}`
    if (maxPrice) path += `&maxPrice=${maxPrice}`
    if (!search) return navigate('/')
    navigate(path)
  }

  useEffect(() => {
    search && onSearch()
    // eslint-disable-next-line
  }, [checked])

  const sortCondition = (string) => {
    setChecked(string)
  }

  const boo = () => { alert('No features') }
  //css button
  if (pathname === '/search') pathname = '/marketplace'

  return (
    <>
      {/* Marketplace Label */}
      <Box className={styles.sidebarLabel}>

        <Box className={styles.label}>
          Marketplace
          <Avatar
            sx={{
              mt: 0.5,
              color: '#fff',
              bgcolor: '#3A3B3C',
              height: 40, width: 40,
            }}>
            <Button onClick={boo} color='inherit'>
              <SettingsIcon />
            </Button>
          </Avatar>
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
            inputRef={searchElement}
            value={search}
            autoFocus={auto}
            onChange={(e) => { setSearch(e.target.value) }}
            onKeyPress={e => e.key === 'Enter' ? (onSearch()) : null}
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

      <Box className={styles.space}></Box>

      {/* Filter */}
      {slug &&
        <>
          <div className={filter.choice}>
            <h3>Condition : {checked}</h3>
            <div className={filter.radio} onClick={(e) => sortCondition('All')}>
              <label>All</label>
              <Radio checked={checked === 'All'} />
            </div>
            <div className={filter.radio} onClick={(e) => sortCondition('New')}>
              <label>New</label>
              <Radio checked={checked === 'New'} />
            </div>
            <div className={filter.radio} onClick={(e) => sortCondition('Used')}>
              <label>Used</label>
              <Radio checked={checked === 'Used'} />
            </div>
          </div>

          {/* Price */}
          <div className={filter.price}>
            <h3>Price</h3>

            <div className={filter.input}>
              <TextField
                sx={{
                  borderRadius: 3,
                  bgcolor: '#3A3B3C',
                  py: 0.6,
                  pl: 1.2,
                  width: '47%',
                }}
                value={minPrice}
                onChange={(e) => { setMinPrice(e.target.value) }}
                onKeyPress={e => e.key === 'Enter' ? onSearch() : null}
                variant="standard"
                placeholder='Min'
                InputProps={{ disableUnderline: true }}
              />
              <p>to</p>
              <TextField
                sx={{
                  borderRadius: 3,
                  bgcolor: '#3A3B3C',
                  py: 0.6,
                  pl: 1.2,
                  width: '47%',
                }}
                value={maxPrice}
                onChange={(e) => { setMaxPrice(e.target.value) }}
                onKeyPress={e => e.key === 'Enter' ? onSearch() : null}
                variant="standard"
                placeholder='Max'
                InputProps={{ disableUnderline: true }}
              />
            </div>

          </div>
        </>
      }

      {/* Menu */}
      <Box>
        {!slug && menu.map((val, idx) => (
          <div onClick={() => val.link ? navigate(val.link) : alert('upcoming')}
            key={idx} className={styles.pointer}>
            <Box className={styles.listing}
              sx={{ bgcolor: val.link === pathname ? '#3A3B3C' : '' }}>
              <Avatar
                sx={{
                  color: '#fff',
                  bgcolor: (val.link === pathname) ? '#1877F2' : '#4E4F50',
                  height: 40, width: 40,
                }}>
                {val.icon}
              </Avatar>
              <Box className={styles.font}>
                {val.name}
              </Box>
            </Box>
          </div>
        ))}

        {/* Add Button */}
        <div onClick={() => navigate('/marketplace/product/add')} className={styles.pointer}>
          <Box className={styles.button}>
            + Create new listing
          </Box>
        </div>
        <Box className={styles.filter}>
          <Box>
            Filters
          </Box>
          <Button onClick={boo} underline="none" >
            Udon Thani . Within 10 kilometers
          </Button>

        </Box>

        {/* categories*/}
        <Box>
          <Box className={styles.font3}>
            Categories
          </Box>

          {categories?.map((val, idx) => (
            <div onClick={() => navigate(val.icon ? '' : '/marketplace/category/' + val.value)}
              key={idx} className={styles.pointer}>

              <Box className={val.icon ? styles.icon : styles.listing}
                sx={{ bgcolor: val.value === pathname ? '#3A3B3C' : '' }}>
                {!val.icon ? null : <Avatar
                  sx={{
                    color: '#fff',
                    bgcolor: '#4E4F50',
                    height: 40, width: 40,
                  }}>
                  {val.icon}
                </Avatar>}
                <Box className={val.icon ? styles.font : styles.font2}>
                  {val.name}
                </Box>
              </Box>

            </div>
          ))}
        </Box>

      </Box>
    </>
  );
}

const menu = [
  { icon: <StorefrontIcon />, name: 'Browse all', link: '/marketplace' },
  { icon: <NotificationsIcon />, name: 'Notifications', link: '/marketplace/notifications' },
  { icon: <DraftsIcon />, name: 'Inbox', link: '/messenger' },
  { icon: <ShoppingBagIcon />, name: 'Buying', link: '' },
  { icon: <LocalOfferIcon />, name: 'Selling', link: '' },
]

export default SideBar