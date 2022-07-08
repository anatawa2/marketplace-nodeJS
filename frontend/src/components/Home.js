import React from 'react'
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

function Home() {
  return (
    <div>
      home 
      <Grid container justifyContent="flex">
        <Grid item xs={12}>
          <Link href="/login" variant="body2">
          login
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link href="/register" variant="body2">
          register
          </Link>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home