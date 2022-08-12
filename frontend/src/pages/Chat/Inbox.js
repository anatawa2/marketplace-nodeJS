import React, { useEffect, useState } from 'react'
import { useNavigate, } from "react-router-dom";
import { Box, Grid, Stack, Link } from '@mui/material';

import { getAxios } from '../../utils/axios'
import { tokenExist } from '../../utils/tokenHandler'

import AppBar from '../../components/AppBar'
import './Chat.css'

function Inbox() {

    const navigate = useNavigate()
    const [myUser, setMyUser] = useState({})
    const [chatLists, setChatLists] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const myEndpoint = "http://192.168.1.125:8080/setting"
    const ListsEndpoint = "http://192.168.1.125:8080/chat"

    const getMyUser = async () => {
        if (!tokenExist()) return navigate('/')
        const { data } = await getAxios(myEndpoint)
        setMyUser(data.user)
    }

    const getLists = async () => {
        const { data } = await getAxios(ListsEndpoint) 
        setChatLists(data.chatLists)
        setIsLoading(false)
    }
 
    useEffect(() => {
        getMyUser()
        getLists()

    }, []) // eslint-disable-line react-hooks/exhaustive-deps  


    if (isLoading) return (<div>Loading</div>)
    else
        return (
            <>
                <AppBar avatar={myUser.avatar} name={myUser.name} />
                <Box className='container'>
                    <Grid container spacing={2}>
                        {/* User */}
                        <Grid item md={3}>
                            <Stack spacing={2}>
                                <Box className='sender'>User 1</Box>
                                {chatLists && chatLists.map((user, idx) => (
                                    <Link href={'/chat/' + user.user} key={idx} underline='none'>
                                        <Box className='sender'>{user.room}</Box>
                                    </Link>
                                ))}
                            </Stack>
                        </Grid>

                        {/* Chat */}
                        <Grid item md={9}>
                            <Box className='chatting'>
                            </Box>

                            {/* form */}
                            <Box className='inputForm'>

                            </Box>

                        </Grid>
                    </Grid>
                </Box >
            </>
        )
}

export default Inbox