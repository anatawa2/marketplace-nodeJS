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
  Box,
  Grid, Stack, Typography
} from '@mui/material';

function Notifications() {

  let searchElement = React.useRef()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [myNotify, setNotify] = useState([])
  const Endpoint = "http://192.168.1.125:8080/notify"
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    if (!tokenExist()) return navigate('/login', { replace: true })
    const { data } = await getAxios(Endpoint)
    setNotify(data.inbox)
  }

  useEffect(() => {
    getData()
    setIsLoading(false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps 

  let notify = [{ sent: `You got ${myNotify.length} unread messages.`, avatar: "/images/mail.jpg" }]

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
            <Box className={styles.itemContainer}
              sx={{ borderLeft: 1, borderColor: '#393A3B' }}>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Stack >
  )
  else return (
    <Stack spacing={7}> {/*appbar*/}
      <MyAppBar searchElement={searchElement} />
      <div className={styles.container}>

        <Grid container>
          <Grid item md={4} lg={3} xl={3}>
            <div className={styles.sidebar}>
              <SideBar pathname={pathname} searchElement={searchElement} />
            </div>
          </Grid>

          <Grid item md={8} lg={9} xl={9} >
            <Box className={styles.itemContainer} sx={{ borderLeft: 1, borderColor: '#393A3B' }}>

              <div className={notif.main}>
                <Typography variant='h4' sx={{ my: 1, mb: 3 }} >
                  Notifications
                </Typography>
                <NotifyBox list={notify} />
              </div>

            </Box>
          </Grid>

        </Grid>
      </div>
    </Stack >
  )
}

export default Notifications