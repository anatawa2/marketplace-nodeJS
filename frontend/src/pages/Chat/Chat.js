import React, { useEffect, useState } from 'react'
import io from "socket.io-client"
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Grid, Stack, Link } from '@mui/material';

import { getAxios, postAxios } from '../../utils/axios'
import { tokenExist } from '../../utils/tokenHandler'

import AppBar from '../../components/AppBar'
import Messages from './Messages';
import './Chat.css'
// const socket = io(ENDPOINT);

let socket
let corsOptions = {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
}

function Chat() {

    const { id } = useParams()
    const navigate = useNavigate()
    const [room, setRoom] = useState('')
    const [myUser, setMyUser] = useState({})
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [chatLists, setChatLists] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const ENDPOINT = 'http://192.168.1.125:8080/'
    const myEndpoint = "http://192.168.1.125:8080/setting/"
    const roomEndpoint = "http://192.168.1.125:8080/chat/" + id
    const sendEndpoint = "http://192.168.1.125:8080/chat/" + id + "/send"

    const getMyUser = async () => {
        if (!tokenExist()) return navigate('/')
        const { data } = await getAxios(myEndpoint)
        setMyUser(data.user)
    }

    const getHistory = async () => {
        const { data: { chatRoom, chatLists } } = await getAxios(roomEndpoint)
        console.log('chatRoom',chatRoom);

        socket = io(ENDPOINT, corsOptions)
        socket.emit('join', chatRoom)
        socket.on('message', ({ user, message }) => {
            let payload = { user: user, message: message }
            setMessages(messages => [...messages, payload])
        })
        setRoom(chatRoom)
        setChatLists(chatLists)
        setIsLoading(false)
    }

    useEffect(() => {
        getMyUser()
        getHistory()

    }, []) // eslint-disable-line react-hooks/exhaustive-deps  

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            let payload = { user: myUser.name, message: message }
            socket.emit('sendMessage', payload, () => { setMessage('') })
        }

    }

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
                                        <Box className='sender'  >{user.room}</Box>
                                    </Link>
                                ))}
                            </Stack>
                        </Grid>

                        {/* Chat */}
                        <Grid item md={9}>
                            <Box className='chatting'>
                                <Messages messages={messages} room={room} />
                            </Box>

                            {/* form */}
                            <Box component="form" onSubmit={sendMessage} className='inputForm'>
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={message}
                                    onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
                                    onChange={e => setMessage(e.target.value)}
                                />
                                <Button type='submit' variant="contained"
                                    sx={{ width: '20%', p: 2, }}>Send
                                </Button>
                            </Box>

                        </Grid>
                    </Grid>
                </Box >
            </>
        )
}

export default Chat