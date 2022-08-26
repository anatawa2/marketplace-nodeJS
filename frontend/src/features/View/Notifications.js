import * as React from 'react';

import MyAppBar from '../../components/AppBar';
import SideBar from '../../components/SideBar';
import NotifyBox from '../../components/NotifyBox';
import { useLocation } from 'react-router-dom';

import { getAxios } from '../../utils/axios'
import { useState, useEffect } from 'react'
import { tokenExist } from '../../utils/tokenHandler'
import { useNavigate } from "react-router-dom";

import styles from '../../components/css/view.module.css';
import notif from '../../components/css/notifyBox.module.css';

import {
  Grid, Stack, Box, Typography
} from '@mui/material';

function Notifications() {

  // const navigate = useNavigate()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [myNotify, setNotify] = useState([])
  const Endpoint = "http://192.168.1.125:8080/notify"

  const getData = async () => {
    if (!tokenExist()) return navigate('/login')
    const { data } = await getAxios(Endpoint)
    setNotify(data.inbox)
  }

  useEffect(() => {
    getData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps 

  let notify = [{ sent: `You got ${myNotify.length} unread messages.`, avatar: "/images/mail.jpg" }]

  return (
    <Stack spacing={7}> {/*appbar*/}
      <MyAppBar />
      <Box className={styles.container}>

        <Grid container>
          <Grid item md={4} lg={3} xl={3}>
            <Box className={styles.sidebar}>
              <SideBar pathname={pathname} />
            </Box>
          </Grid>

          <Grid item md={8} lg={9} xl={9} >
            <Box className={styles.itemContainer}>

              <div className={notif.main}>
                <Typography variant='h4' sx={{ my: 1, mb: 3 }} >
                  Notifications
                </Typography>
                <NotifyBox list={notify} />
              </div>

            </Box>
          </Grid>

        </Grid>
      </Box>
    </Stack >
  )
}

export default Notifications