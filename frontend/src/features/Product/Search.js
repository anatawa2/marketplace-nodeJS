import * as React from 'react';
import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { getAxios } from '../../utils/axios'

import MyAppBar from '../../components/AppBar';
import SideBar from '../../components/SideBar';
import ListsProducts from '../../components/ListsProducts';
import {
  Stack, Grid, Box
}
  from '@mui/material';

import styles from '../../components/css/view.module.css';

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

function Search({ auto }) {

  const query = useQuery();
  const navigate = useNavigate()
  const { search } = useLocation()
  const [cate, setCate] = useState('')
  const [listsItem, setListsItem] = useState([])
  const endpoint = "http://192.168.1.125:8080/search" + search

  const getLists = async () => {
    setCate(` search : ${query.get("name")}`)
    if (query.get("name") === '') navigate('/')

    const { data } = await getAxios(endpoint)
    if (data.product.length === 0) setCate('Not Found')
    setListsItem(data.product)
  }

  useEffect(() => {
    query.get("name") && getLists()
  }, [search]) // eslint-disable-line react-hooks/exhaustive-deps  

  return (
    <Stack spacing={7}> {/*appbar*/}
      <MyAppBar />

      <Box className={styles.container}>
        <Grid container>

          <Grid item md={4} lg={3} xl={3}>
            <Box className={styles.sidebar}>
              <SideBar slug={query.get("name")} auto={auto} />
            </Box>
          </Grid>

          <Grid item md={8} lg={9} xl={9} >
            <Box className={styles.itemContainer}>
              <ListsProducts listsItem={listsItem} category={cate} />
            </Box>
          </Grid>

        </Grid>
      </Box>
    </Stack >
  )
}

export default Search