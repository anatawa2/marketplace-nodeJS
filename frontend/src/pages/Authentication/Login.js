import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swal } from '../../utils/Swal'
// MUI 
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
    FormControlLabel, Typography, TextField, Box,
    Button, Link, Avatar, Checkbox, Container, Grid
} from '@mui/material';


import AppBar from '../../components/AppBar'
import { postAxios } from '../../utils/axios'
import { tokenExist } from '../../utils/tokenHandler'

function Login() {

    const navigate = useNavigate()
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        if (tokenExist()) navigate('/')
    }, [])// eslint-disable-line react-hooks/exhaustive-deps  

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({ ...inputs, [name]: value, "expiresIn": "86400" })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const endpoint = "http://192.168.1.125:8080/login"
        const { data } = await postAxios(endpoint, inputs)

        if (!data.user) return Swal.err(data.err)
        localStorage.setItem('token', data.user.token)
        navigate(0)

    }
    return (
        <div>
            <AppBar name={''} />
            <Container maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            variant="filled"
                            margin="normal"
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
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={inputs.password || ""}
                            onChange={handleChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default Login