import * as React from 'react';

import MyAppBar from '../../components/AppBar';
import SideBar from '../../components/SideBar';
import NotifyBox from '../../components/NotifyBox';
import { useLocation } from 'react-router-dom';

import { getAxios } from '../../utils/axios'
import { useState, useEffect } from 'react'
import { tokenExist } from '../../utils/tokenHandler'
import { useNavigate } from 'react-router-dom';

import styles from '../../components/css/view.module.css';
import notif from '../../components/css/notifyBox.module.css';

import {
    Box,
    Grid, Stack, Typography
} from '@mui/material';

function Inbox() {

    const navigate = useNavigate()
    let searchElement = React.useRef()
    const { pathname } = useLocation()
    const [notify, setNotify] = useState([])
    const [myUser, setMyUser] = useState({ name: '' })
    const [isLoading, setIsLoading] = useState(true)

    const userEndpoint = "http://192.168.1.125:8080/setting"
    const Endpoint = "http://192.168.1.125:8080/notify"

    const getMyUser = async () => {
        if (!tokenExist()) return navigate('/login', { replace: true });
        const { data } = await getAxios(userEndpoint)
        setMyUser(data.user)

        const { data: { inbox } } = await getAxios(Endpoint)
        setNotify(inbox)
        setIsLoading(false)

    }

    useEffect(() => {
        getMyUser()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps 

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
            <MyAppBar avatar={myUser.avatar} name={myUser.name} searchElement={searchElement} />
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
                                <Typography variant='h5' sx={{ my: 2, mb: 1 }} >
                                    Selling , Buying
                                </Typography>
                            </div>

                            <div> &nbsp; </div>

                            <div className={notif.main}>
                                <NotifyBox list={notify} />
                            </div>

                        </Box>
                    </Grid>

                </Grid>
            </div>
        </Stack >
    )
}

export default Inbox