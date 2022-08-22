import * as React from 'react';
import { useState, useEffect } from 'react'

import { getAxios } from '../../utils/axios'
import { tokenExist } from '../../utils/tokenHandler'

import MyAppBar from '../../components/AppBar';
import SideBar from '../../components/SideBar';
import ListsProducts from '../../components/ListsProducts';
import '../../components/theme/view.css'
import {
  Stack, Grid, Box
}
  from '@mui/material';

import { useLocation } from 'react-router-dom';

function Marketplace() {

  const { pathname } = useLocation()
  const [listsItem, setListsItem] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const endpoint = "http://192.168.1.125:8080/"


  const getLists = async () => {
    const { data } = await getAxios(endpoint)
    setListsItem(data.product)
    setIsLoading(false)
  }

  useEffect(() => { 
    getLists()
  }, [])

  if (isLoading) return
  else return (
    <Stack spacing={7}> {/*appbar*/}
      <MyAppBar />

      <Box className='container'>
        <Grid container>

          <Grid item md={4} lg={3} xl={3}>
            <Box className='sidebar'>
              <SideBar pathname={pathname} />
            </Box>
          </Grid>

          <Grid item md={8} lg={9} xl={9} >
            <Box className='itemContainer'>
              <ListsProducts listsItem={listsItem} />
            </Box>
          </Grid>

        </Grid>
      </Box>
    </Stack >
  )
}

export default Marketplace