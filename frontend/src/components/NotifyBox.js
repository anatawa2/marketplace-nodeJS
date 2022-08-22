import React from 'react'

import {
    Link, Box
} from '@mui/material';

function NotifyBox({ list }) {
    return (
        // KEY LINK SRC TEXT
        <>
            {list.map((val, idx) => (
                <Link href={val.user ? ('/chat/' + val.user) : '/inbox'} underline="none" color="inherit">
                    <div className='notiTab'>
                        <img alt='pic' src={val.avatar ? val.avatar : "/images/profile.jpg"} width="90" height="90" style={{ borderRadius: '10%' }} />
                        <Box className='notiText'>
                            <div>
                                {val.name}
                            </div>
                            : {val.sent}
                        </Box>
                    </div>
                </Link>
            ))}
        </>

    )
}

export default NotifyBox