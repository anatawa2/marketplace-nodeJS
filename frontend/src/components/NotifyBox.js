import React from 'react'
import styles from './css/notifyBox.module.css';

import { useNavigate } from 'react-router-dom';

function NotifyBox({ list }) {

    const navigate = useNavigate()
    return (
        // KEY LINK SRC TEXT
        <>
            {list.map((val, idx) => (
                <div style={{ cursor: 'pointer' }} onClick={() => navigate(val.user ? ('/messenger/inbox/' + val.user) : '/messenger')} key={idx}>
                    <div className={styles.notiTab}>
                        <img alt='pic' src={val.avatar ? val.avatar : "/images/profile.jpg"} width="90" height="90" style={{ borderRadius: '10%' }} />
                        <div className={styles.notiText}>
                            <div>
                                {val.name}
                            </div>
                            : {val.sent}
                        </div>
                    </div>
                </div>
            ))}
            {list.length === 0 &&
                <>
                    <div>
                        <h3>No new message.</h3>
                    </div>
                </>
            }
        </>

    )
}

export default NotifyBox