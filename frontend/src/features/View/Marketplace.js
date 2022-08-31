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

  useEffect(() => {
    if (listsItem.length) {
      const scrollPosition = localStorage.getItem('scrollPosition')
      if (scrollPosition) {
        window.scrollTo({ left: 0, top: scrollPosition });
        localStorage.removeItem('scrollPosition')
      }
    }
  }, [listsItem])

  if (isLoading) return (
    <Stack spacing={7} > {/*appbar*/}
      <MyAppBar />
      <div className={styles.container}>
        <Grid container>
          <Grid item md={4} lg={3} xl={3}>
            <div className={styles.sidebar}>
              <SideBar />
            </div>
          </Grid>

          <Grid item md={8} lg={9} xl={9} >
            <Box className={styles.itemContainer}>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Stack >
  )

  else return (
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