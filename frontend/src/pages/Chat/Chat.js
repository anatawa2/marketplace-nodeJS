import React, { useEffect, useState } from 'react'
import io from "socket.io-client"
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Grid, Stack, Avatar } from '@mui/material';

import { getAxios, postAxios } from '../../utils/axios'
import { tokenExist } from '../../utils/tokenHandler'

import AppBar from '../../components/AppBar'
import Messages from './Messages';
import Inbox from './Inbox';
import './Chat.css'

let socket
let corsOptions = {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
}

const toTimeObj = (xx) => {
    // turn String -> Obj
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
    // update latest Array fresh
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
    const [room, setRoom] = useState('')
    const [myUser, setMyUser] = useState({})
    const [urUser, setUrUser] = useState({})
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const [inbox, setInbox] = useState([])
    const [history, setHistory] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const ENDPOINT = 'http://192.168.1.125:8080/'
    const myEndpoint = "http://192.168.1.125:8080/setting/"
    const seenEndpoint = "http://192.168.1.125:8080/seenchat"
    const roomEndpoint = "http://192.168.1.125:8080/chat/" + id
    const chatEndpoint = "http://192.168.1.125:8080/userid/" + id
    const sendEndpoint = `http://192.168.1.125:8080/chat/${id}/send`

    const getUser = async () => {
        if (!tokenExist()) return navigate('/')
        const { data: my } = await getAxios(myEndpoint)
        const { data: ur } = await getAxios(chatEndpoint)
        setMyUser(my.user)
        setUrUser(ur.user)
    }

    const init = async () => {
        const { data: { chatRoom, inbox, chatHistory } } = await getAxios(roomEndpoint)

        let sortInbox = toTimeObj(inbox)
        setInbox(sortInbox)
        setRoom(chatRoom)
        setHistory(chatHistory)
        setIsLoading(false)
    }

    useEffect(() => {
        getUser()
        init()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps  

    useEffect(() => {
        socket = io(ENDPOINT, corsOptions)
        inbox.forEach(element => {
            socket.emit('join', (element.chat_room))
        })
        socket.on('messages', ({ room, user, message }) => {
            let payload = { user: user, message: message }
            let fresh = updateInbox(inbox, user, message, room)
            setMessages(messages => [...messages, payload])
            setInbox(fresh)
        })
    }, [inbox])

    const sendMessage = async (event) => {
        event.preventDefault();
        if (message) {
            let payload = { user: myUser.name, message: message, room: room }
            socket.emit('sendMessage', payload, () => { setMessage('') })
            //send to seen
            postAxios(seenEndpoint, { room: room })
            postAxios(sendEndpoint, { chatRoom: room, messages: payload })
        }
    }

    if (isLoading) return (<div></div>)
    else
        return (
            <>
                <AppBar avatar={myUser.avatar} name={myUser.name} />
                <Box className='container'>
                    <Grid container spacing={2}>
                        {/* User */}
                        <Grid item md={3}>
                            <Stack spacing={2}>
                                <Box className='inbox'>User 1</Box>
                                <Inbox list={inbox} myUser={myUser} id={id} />
                            </Stack>
                        </Grid>

                        {/* Chat */}
                        <Grid item md={9}>
                            <Box className='chatting'>
                                <Avatar alt={urUser.name} src={urUser.avatar}
                                    sx={{
                                        bgcolor: '#3A3B3C',
                                        width: 50, height: 50
                                    }} />
                                ROOM : {urUser.name}
                                <Messages messages={history} />
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
                </Box>
            </>
        )
}

export default Chat