import React, { useEffect, useState } from 'react'
import io from "socket.io-client"
import { useNavigate, useParams } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import {
    Box, Button, Grid, Avatar, TextField,
    InputAdornment, Stack
} from '@mui/material';

import { getAxios, postAxios } from '../../utils/axios'
import { tokenExist } from '../../utils/tokenHandler'

import AppBar from '../../components/AppBar'
import Messages from './Messages';
import List from './List';
import styles from './css/chat.module.css'

let socket
let corsOptions = {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
}

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

const updateInbox = (inbox, user, message, room) => {
    let clone = inbox
    let idx = inbox.findIndex(val => val.chat_room === room)
    // update latest Array fresh for sorting
    clone[idx]['sent'] = message
    clone[idx]['sentBy'] = user
    clone[idx]['updatedAt'] = new Date()
    clone.sort(function (a, b) {
        return b.updatedAt.getTime() - a.updatedAt.getTime();
    });
    return clone
}

function Chat() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [start, setStart] = useState({})
    const [myUser, setMyUser] = useState({})
    const [urUser, setUrUser] = useState({})
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const [search, setSearch] = useState('')
    const [trig, setTrig] = useState(0)
    const [inbox, setInbox] = useState([])
    const [thisRoom, setRoom] = useState('')
    const [history, setHistory] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const ENDPOINT = 'http://192.168.1.125:8080/'
    const myEndpoint = "http://192.168.1.125:8080/setting/"
    const seenEndpoint = "http://192.168.1.125:8080/seenchat"
    const chatEndpoint = "http://192.168.1.125:8080/userid/" + id
    const roomEndpoint = "http://192.168.1.125:8080/inbox/" + id
    const sendEndpoint = `http://192.168.1.125:8080/inbox/${id}/send`

    const getUser = async () => {
        if (!tokenExist()) return navigate('/login', { replace: true })
        const { data: my } = await getAxios(myEndpoint)
        const { data: ur } = await getAxios(chatEndpoint)
        setMyUser(my?.user)
        setUrUser(ur?.user)
    }

    const init = async () => {
        const { data: { chatRoom, inbox, chatHistory, start } } = await getAxios(roomEndpoint)
        if (chatRoom) {
            let sortInbox = toTimeObj(inbox)
            setStart(start)
            setInbox(sortInbox)
            setRoom(chatRoom)

            //load once at first render
            setIsLoading && setHistory(chatHistory)
        }
        setIsLoading(false)
    }

    //switch inbox
    useEffect(() => {
        init()
        getUser()
    }, [id]) // eslint-disable-line react-hooks/exhaustive-deps  

    useEffect(() => {
        socket = io(ENDPOINT, corsOptions)
        inbox.forEach(element => {
            socket.emit('join', (element.chat_room))
        })
        // inside out to trigger message
        socket.on('messages', ({ room, user, message }) => {
            let payload = { user: user, message: message }
            setMessages(messages => [...messages, payload])
            //sort by time
            let fresh = updateInbox(inbox, user, message, room)
            setInbox(fresh)
        })
    }, [inbox]) // eslint-disable-line react-hooks/exhaustive-deps 

    const sendMessage = async (event) => {
        event.preventDefault();
        if (message) {
            let payload = { user: myUser.name, message: message, room: thisRoom }
            socket.emit('sendMessage', payload, () => {
                setMessage('')
                setTrig(val => val + 1)
            })
            //send to seen
            postAxios(seenEndpoint, { room: thisRoom, toId: id })
            postAxios(sendEndpoint, { chatRoom: thisRoom, messages: payload })
            if (start === 1) navigate(0)
        }
    }

    if (isLoading) return (<div></div>)
    else
        return (
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
                                            onChange={(e) => { setSearch(e.target.value) }}
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
                                    <List inbox={inbox} myUser={myUser} id={id}
                                        trig={trig} search={search} />
                                </Box>
                            </Box>
                        </Grid>

                        {/* Chat */}
                        <Grid item md={9} sm={9} xs={9}>
                            <Box className={styles.rightContainer}>
                                <Box className={styles.userBar}>
                                    <Avatar alt={urUser.name} src={urUser.avatar}
                                        sx={{ width: 65, height: 65, mr: 2 }} />
                                    {urUser.name}
                                </Box>
                                <Box className={styles.chatting}>
                                    <Messages messages={history} myName={myUser.name}
                                        urUser={urUser} />


                                    <Messages messages={messages} myName={myUser.name}
                                        urUser={urUser} />

                                </Box>

                                {/* form */}
                                <Box className={styles.inputForm} component='form' onSubmit={sendMessage} >
                                    <TextField
                                        sx={{
                                            borderRadius: 10,
                                            bgcolor: '#3A3B3C',
                                            py: 0.4,
                                            pl: 1,
                                        }}
                                        autoFocus
                                        fullWidth
                                        placeholder='Aa'
                                        autoComplete="off"
                                        variant="standard"
                                        value={message}
                                        InputProps={{ disableUnderline: true, }}
                                        onChange={e => setMessage(e.target.value)}
                                        onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
                                    />
                                    <Button type='submit' variant="contained"
                                        sx={{ width: '10%', py: 1, ml: 2 }}>Send
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
        )
}

export default Chat