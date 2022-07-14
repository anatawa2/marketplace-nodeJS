import React from 'react'
import PrimarySearchAppBar from './AppBar'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

function About() {
    return (
        <div>
            <PrimarySearchAppBar />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                About
            </Container>
        </div>
    )
}

export default About