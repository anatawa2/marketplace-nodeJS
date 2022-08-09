import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
    Typography, TextField, Container, Button,
    Avatar, Grid, Link, Box
} from '@mui/material';


import AppBar from '../../components/AppBar'
import { Swal } from '../../utils/Swal'
import { postAxios } from '../../utils/axios'
import { tokenExist } from '../../utils/tokenHandler'


function Register() {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (tokenExist()) navigate('/') 
    }, []) // eslint-disable-line react-hooks/exhaustive-deps  

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (event) => {

        setIsLoading(true)
        event.preventDefault();
        if (inputs['password'] !== inputs['repassword']) {
            setInputs({ ...inputs, 'password': '', 'repassword': '' })
        }

        const endpoint = "http://192.168.1.125:8080/register"
        const { data } = await postAxios(endpoint, inputs)

        if (data.err) Swal.err(data.err)
        if (data.status === 'ok') {
            Swal.ok()
            navigate(0)
        }
        setIsLoading(false)
    }

    if (isLoading) return (<div>Loading</div>)
    if (!tokenExist()) {
        return (
            <div>
                <AppBar name={''} />
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 12,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="filled"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        value={inputs.email || ""}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="filled"
                                        autoComplete="given-name"
                                        name="name"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        value={inputs.name || ""}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="filled"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={inputs.password || ""}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="filled"
                                        required
                                        fullWidth
                                        name="repassword"
                                        label="Re-Password"
                                        type="password"
                                        id="repassword"
                                        value={inputs.repassword || ""}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </div>
        )
    }
}

export default Register