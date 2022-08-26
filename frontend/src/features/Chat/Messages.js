import React from 'react'
import {
    Box, Avatar
} from '@mui/material';

import styles from './css/chat.module.css'

function Messages({ messages, myName, urUser }) {
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
        </>
    )
}

export default Messages