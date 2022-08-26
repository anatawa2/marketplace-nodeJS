import {
    Box, Link, Avatar, Typography
} from '@mui/material';

import React from 'react'
import styles from './css/chat.module.css'

function user({ list, myUser, id }) {

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

    return (
        <Box>
            {list && list.map((user, idx) => (
                <Link href={'/chat/' + user.user}
                    underline='none' key={idx}
                    color={user.sentBy === myUser.name ? 'gray' :
                        (user.user === id && 'gray') || 'white'}>

                    <Box className={(user.user === id && styles.userPick) || styles.user}
                        backgroundColor={user.user === id && '#252F3C'}  >

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
                                : user.sent.substr(0, 20) + '...'}
                            •&nbsp;
                            {timeString(user.updatedAt)}
                        </Box>
                    </Box>
                </Link>
            ))}
        </Box>
    )
}

// {list && list.map((user, idx) => (
//     <Link href={'/chat/' + user.user} key={idx} underline='none'
//         color={(last.user || user.sentBy) === myUser.name && (last.chatRoom === user.chat_room) ? 'gray' : 'inherit'}>
//         <Box className='user'>
//             <Avatar alt={user.name} src={user.avatar}
//                 sx={{
//                     bgcolor: '#3A3B3C',
//                     width: 60, height: 60
//                 }} />
//             {user.name}
//             <p>
//                 {!!last && (last.chatRoom === user.chat_room)
//                     ?
//                     (last.user === myUser.name ? `you : ${last.message}` : last.message)
//                     :
//                     (user.sentBy === myUser.name ? `you : ${user.sent}` : user.sent)
//                 }
//             </p>
//             <p>
//                 {/* {timeString(user.updatedAt)} */}
//             </p>
//         </Box>
//     </Link>
// ))}

export default user