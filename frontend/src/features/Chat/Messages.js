import React, { useEffect, useRef } from 'react'
import {
    Box, Avatar
} from '@mui/material';
import styles from './css/chat.module.css'

function Messages({ messages, myName, urUser }) {

    const divRef = useRef()
    //wait to load then scroll
    setTimeout(() => {
        divRef.current?.scrollIntoView()
    }, 10);

    useEffect(() => {
        divRef.current?.scrollIntoView()
    }, [messages])

    return (
        <>
            {messages && messages.map((message, i) =>
                message?.user === myName
                    ?
                    <Box className={styles.sendContainer} key={i}>
                        <Box className={styles.send}>
                            {message?.message}
                        </Box>
                    </Box>
                    :
                    message?.user === urUser?.name &&
                    <Box className={styles.receiveContainer} key={i}>
                        <Avatar alt='pic' src={urUser.avatar}
                            sx={{ width: 40, height: 40, mr: 1 }} />
                        <Box className={styles.receive}>
                            {message.message}
                        </Box>
                    </Box>

            )}
            <div ref={divRef} />
        </>
    )
}

export default Messages