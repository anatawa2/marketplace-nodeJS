import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

import PrimarySearchAppBar from './Search'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Profile() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [isLoaded, setIsLoaded] = useState(false);
    const [inputs, setInputs] = useState({})

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://192.168.1.125:8080/setting", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 'ok') {
                    setInputs(result.user)
                    setIsLoaded(false)
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: result.message
                    }).then(navigate('/'))
                }
            })
            .catch(error => console.log('error', error));
    }, []) // eslint-disable-line react-hooks/exhaustive-deps    

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
        console.log(inputs);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var formdata = new FormData();
        for (let i in inputs) {
            formdata.append(i, inputs[i]);
        }

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://192.168.1.125:8080/setting", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 'ok') {
                    Swal.fire({
                        title: 'Save!',
                        icon: 'success'
                    }).then(() => {
                        setInputs(values => ({ ...values, 'password': '', 'repassword': '' }))
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: result.err
                    })
                    console.log(result);
                }
            })
            .catch(error => console.log('error', error));
    }

    if (isLoaded) return (<div>Loading</div>)
    else {
        return (
            <div>
                <PrimarySearchAppBar />
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            My Profile
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="name"
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        value={inputs.name || ""}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="bio"
                                        fullWidth
                                        id="bio"
                                        label="Bio"
                                        value={inputs.bio || ""}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="password"
                                        fullWidth
                                        id="password"
                                        label="New password"
                                        type="password"
                                        value={inputs.password || ""}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="repassword"
                                        fullWidth
                                        id="repassword"
                                        type="password"
                                        label="Confirm password"
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
                                Save
                            </Button>

                        </Box>
                    </Box>
                </Container>
                <button onClick={logout}>Logout</button>
            </div>
        )
    }
}

export default Profile