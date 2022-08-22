import * as React from 'react';

import MyAppBar from '../../components/AppBar';
import SideBar from '../../components/SideBar';
import NotifyBox from '../../components/NotifyBox';
import { useLocation } from 'react-router-dom';

import { getAxios } from '../../utils/axios'
import { useState, useEffect } from 'react'
import { tokenExist } from '../../utils/tokenHandler'
import { useNavigate } from 'react-router-dom';

import '../../components/theme/notifyBox.css'

import {
  Grid, Stack, Box, Typography
} from '@mui/material';

function Notifications() {

  // const navigate = useNavigate()
  const { pathname } = useLocation()
  const [myUser, setMyUser] = useState({ name: '' })
  const userEndpoint = "http://192.168.1.125:8080/setting"

  const getMyUser = async () => {
    if (!tokenExist()) return;
    const { data } = await getAxios(userEndpoint)
    setMyUser(data.user)
  }

  useEffect(() => {
    getMyUser()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps 

  let notif = [{ sent: 'You got 2 unread messages.', avatar: "/images/mail.jpg" }]

  return (
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

              <div className='main'>
                <Typography variant='h4' sx={{ my: 1, mb: 3 }} >
                  Notifications
                </Typography>
                <NotifyBox list={notif} />
              </div>

            </Box>
          </Grid>

        </Grid>
      </Box>
    </Stack >
  )
}

export default Notifications