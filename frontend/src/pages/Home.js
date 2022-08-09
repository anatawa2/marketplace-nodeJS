import * as React from 'react';
import { useState, useEffect } from 'react'

import { getAxios } from '../utils/axios'
import { tokenExist } from '../utils/tokenHandler'

import MyAppBar from '../components/AppBar';
import SideBar from '../components/SideBar';
import ListProducts from '../components/ListProducts';

import {
  Stack, Grid
}
  from '@mui/material';

function Store() {

  const [myUser, setMyUser] = useState({ name: '' })
  const [listItem, setListItem] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const endpoint = "http://192.168.1.125:8080/"

  const getMyUser = async () => {
    if (!tokenExist()) return;
    const { data } = await getAxios(endpoint + 'setting')
    setMyUser(data.user)
  }

  const getList = async () => {
    const { data } = await getAxios(endpoint)
    setListItem(data.product)
    setIsLoading(false)
  }

  useEffect(() => {
    getMyUser()
    getList()
  }, [])

  if (isLoading) return (<div>Loading</div>)
  else return (
    <Stack spacing={6}>
      <MyAppBar avatar={myUser.avatar} name={myUser.name} />
      <Grid container >
        <Grid item xl={3} lg={3} md={4} >
          <SideBar />
        </Grid>
        <Grid item xl={9} lg={9} md={8} xs={12} >
          <ListProducts listItem={listItem} />
        </Grid>
      </Grid>
    </Stack>
  )
}

export default Store