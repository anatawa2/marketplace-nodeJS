import React from 'react'
import PrimarySearchAppBar from './AppBar'

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

function Search() {
  return (
    <div>
      <PrimarySearchAppBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        Search
      </Container>
    </div>
  )
}

export default Search