import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Stack } from '@mui/material';
import io from "socket.io-client"

import { getAxios } from '../../utils/axios'
import { tokenExist } from '../../utils/tokenHandler'

import AppBar from '../../components/AppBar'
import Messages from './Messages';
import './Chat.css'

const myEndpoint = "http://192.168.1.125:8080/setting/"
const ENDPOINT = 'http://192.168.1.125:8080/'
// const socket = io(ENDPOINT);

let socket
function Chat() {

    const room = 'darkroom'
    const [myUser, setMyUser] = useState({ name: '', avatar: '' })
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const getMyUser = async () => {
        if (!tokenExist()) return;
        const { data } = await getAxios(myEndpoint)
        setMyUser(data.user)
    }

    useEffect(() => {
        getMyUser()
        socket = io(ENDPOINT)

        socket.emit('join', room)

    }, [])

    useEffect(() => {
        socket.on('message', ({ user, message }) => {
            let payload = { user: user, message: message }
            setMessages(messages => [...messages, payload]);
        });
    }, []);

    console.log('message :', message);
    console.log('messages :', messages);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            let payload = { user: myUser.name, message: message }
            socket.emit('sendMessage', payload, () => { setMessage('') });
        }
    }


    return (
        <>
            <AppBar avatar={myUser.avatar} name={myUser.name} />
            <Box className='container'>
                <Grid container spacing={2}>
                    {/* User */}
                    <Grid item md={3}>
                        <Stack spacing={2}>
                            <Box className='sender'>User 1</Box>
                            <Box className='sender'>User 2</Box>
                            <Box className='sender'>User 3</Box>
                        </Stack>
                    </Grid>

                    {/* Chat */}
                    <Grid item md={9}>
                        <Box className='chatting'>
                            <Messages messages={messages} />
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