import * as React from 'react';
import { useState, useEffect } from 'react'

import { getAxios } from '../../utils/axios'

import MyAppBar from '../../components/AppBar';
import SideBar from '../../components/SideBar';
import ListsProducts from '../../components/ListsProducts';
import styles from '../../components/css/view.module.css';
import {
  Stack, Grid, Box
}
  from '@mui/material';

import { useLocation } from 'react-router-dom';

function Marketplace({ auto }) {

  let searchElement = React.useRef()
  const { pathname } = useLocation()
  const [listsItem, setListsItem] = useState([])
  const endpoint = "http://192.168.1.125:8080/"

  const getLists = async () => {
    const { data } = await getAxios(endpoint)
    setListsItem(data.product)
  }

  useEffect(() => {
    getLists()
  }, [])

  return (
    <Stack spacing={7}> {/*appbar*/}
      <MyAppBar searchElement={searchElement} />

      <Box className={styles.container}>
        <Grid container>

          <Grid item md={4} lg={3} xl={3} >
            <Box className={styles.sidebar}>
              <SideBar pathname={pathname} searchElement={searchElement} auto={auto} />
            </Box>
          </Grid>

          <Grid item md={8} lg={9} xl={9} >
            <Box className={styles.itemContainer}>
              <ListsProducts listsItem={listsItem} />
            </Box>
          </Grid>

        </Grid>
      </Box>
    </Stack >
  )
}

export default Marketplace