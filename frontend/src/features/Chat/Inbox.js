import React, { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import {
    Box, Grid, TextField,
    InputAdornment, Stack, Avatar, Typography
} from '@mui/material';

import AppBar from '../../components/AppBar'

import { getAxios } from '../../utils/axios'
import { tokenExist } from '../../utils/tokenHandler'

import styles from './css/chat.module.css'
import { useNavigate } from 'react-router-dom';

const toTimeObj = (xx) => {
    // String -> Obj && sort date
    let newFormat = xx
    for (let i in newFormat) {
        let n = new Date(newFormat[i]['updatedAt'])
        newFormat[i]['updatedAt'] = n
    }
    // sort High to Low
    newFormat.sort(function (a, b) {
        return b.updatedAt.getTime() - a.updatedAt.getTime();
    })
    return newFormat
}
const timeString = (t) => {
    let now = (Date.now() - new Date(t).getTime()) / 1000 //to second 
    let hour = 60 * 60
    let day = 60 * 60 * 24
    if (now < 60) return 'just now'
    if (now >= 0 && now < hour) return Math.trunc(now / 60) + 'm'
    if (now >= hour && now < day) return Math.trunc(now / hour) + 'h'
    if (now >= day && now < day * 7) return Math.trunc(now / day) + 'd'
    if (now >= day * 7) return Math.trunc(now / (day * 7)) + 'w'
    else return `?`
}

function Inbox() {

    const navigate = useNavigate()
    const [inbox, setInbox] = useState([])
    const [search, setSearch] = useState('')
    const [myUser, setMyUser] = useState({ name: '' })
    const [isLoading, setIsLoading] = useState(true)
    const endpoint = "http://192.168.1.125:8080/inbox/"
    const myEndpoint = "http://192.168.1.125:8080/setting"

    const getMyUser = async () => {
        if (!tokenExist()) return navigate('/')
        const { data: { user } } = await getAxios(myEndpoint)
        setMyUser(user)
    }

    const init = async () => {
        const { data: { inbox } } = await getAxios(endpoint)
        let sortInbox = toTimeObj(inbox)
        setInbox(sortInbox)
        setIsLoading(false)
    }

    useEffect(() => {
        getMyUser()
        init()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps   

    useEffect(() => {
        let val = search.match(/^[a-zA-Z0-9_ ]*$/i) //allow spaces between words 
        let reg = new RegExp(val, 'gi')
        let filter = inbox.filter(val => val.name.match(reg))
        setInbox(filter)
        if (search === '') init()
    }, [search]) // eslint-disable-line react-hooks/exhaustive-deps  

    const run = (id) => {
        navigate('/messenger/inbox/' + id)
        navigate(0)
    }

    if (isLoading) return 
    else return (
        <Stack spacing={7}>
            <AppBar />
            <Box className={styles.container}>
                <Grid container spacing={2}>
                    {/* User */}
                    <Grid item md={3} sm={3} xs={3}>
                        <Box className={styles.inboxContainer}>
                            <Box className={styles.chatsLabel}>
                                Chats
                                <Box sx={{ my: 1.5, mr: 1 }}>
                                    <TextField
                                        sx={{
                                            borderRadius: 10,
                                            bgcolor: '#3A3B3C',
                                            py: 0.5,
                                            pl: 1,
                                        }}
                                        fullWidth
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        autoComplete="off"
                                        variant="standard"
                                        placeholder='Search Messenger'
                                        InputProps={{
                                            disableUnderline: true,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon sx={{ color: '#B0B3B8' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box className={styles.inbox}>
                                {inbox && inbox.map((user, idx) => (
                                    <div className={user.sentBy === myUser.name ? styles.userColor1 : styles.userColor2}
                                        onClick={() => run(user.user)} key={idx}>

                                        <Box className={(user.user === 'id' && styles.userPick) || styles.user}
                                            backgroundColor={user.user === 'id' && '#252F3C'}  >

                                            <Avatar alt={user.name} src={user.avatar}
                                                sx={{
                                                    bgcolor: '#3A3B3C',
                                                    width: 60, height: 60,
                                                }} />
                                            <Box className={styles.name} >
                                                <Typography variant='h6'>
                                                    {user.name}
                                                </Typography>

                                                {user.sentBy === myUser.name ? 'you : ' : null}
                                                {user.sent.length < 20
                                                    ?
                                                    user.sent
                                                    : user.sent.substr(0, 8) + '...'}
                                                •&nbsp;
                                                {timeString(user.updatedAt)}
                                            </Box>
                                        </Box>
                                    </div>
                                ))}
                            </Box>
                        </Box>
                    </Grid>

                    {/* Chat */}
                    <Grid item md={9} sm={9} xs={9}>
                        <Box className={styles.rightContainer}>

                            <div className={styles.noChat}>
                                {inbox.length === 0 && 'No conversation'}
                            </div>

                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Stack>
    )
}

export default Inbox