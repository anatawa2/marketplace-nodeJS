import { Box, Link, Avatar } from '@mui/material';
import React from 'react'

import './Chat.css'

function Inbox({ list, myUser, id }) {

    // const timeString = (t) => {
    //     let newFormat = new Date(t)
    //     // Date.now()
    //     // newFormat.getTime()
    //     return newFormat.toLocaleTimeString()
    // }
    return (
        <div>
            {list && list.map((user, idx) => (
                <Link href={'/chat/' + user.user} key={idx} underline='none'
                    color={user.sentBy === myUser.name ? 'gray' : (user.user === id && 'gray') || 'lime'}>
                    <Box className='inbox'>
                        <Avatar alt={user.name} src={user.avatar}
                            sx={{
                                bgcolor: '#3A3B3C',
                                width: 60, height: 60
                            }} />
                        {user.name}
                        <p>
                            {user.sentBy === myUser.name ? 'you : ' : null} {user.sent}
                        </p>
                        <p>
                            {/* {timeString(user.updatedAt)} */}
                        </p>
                    </Box>
                </Link>
            ))}
        </div>
    )
}

// {list && list.map((user, idx) => (
//     <Link href={'/chat/' + user.user} key={idx} underline='none'
//         color={(last.user || user.sentBy) === myUser.name && (last.chatRoom === user.chat_room) ? 'gray' : 'inherit'}>
//         <Box className='inbox'>
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

export default Inbox