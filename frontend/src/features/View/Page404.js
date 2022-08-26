import React from 'react'
import MyAppBar from '../../components/AppBar';
function Page404() {
  return (
    <>
      <MyAppBar />
      <div style={{
        marginTop: 70, display: 'flex',
        justifyContent: 'center',
      }}>
        404 Not Found </div>
    </>
  )
}

export default Page404