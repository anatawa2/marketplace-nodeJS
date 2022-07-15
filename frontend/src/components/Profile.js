import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

import PrimarySearchAppBar from './AppBar'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";

import { getAxios, patchAxios } from '../utils/axios'
import { tokenExist } from '../utils/tokenHandler'



function Profile() {

    const endpoint = 'http://192.168.1.125:8080/setting/'
    const [isLoaded, setIsLoaded] = useState(true);
    const [inputs, setInputs] = useState({})
    const navigate = useNavigate()
 
    useEffect(() => {
        
        if (!tokenExist()) navigate('/')   
        getAxios(endpoint, setInputs)
        setIsLoaded(false)


    }, []) // eslint-disable-line react-hooks/exhaustive-deps   

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        if (inputs['password'] === inputs['repassword']) {

            patchAxios('http://192.168.1.125:8080/setting', inputs)
            Swal.fire({ title: 'Save!', icon: 'success' })
            setInputs({ ...inputs, 'password': '', 'repassword': '' })

        } else {
            Swal.fire({ icon: 'error', text: "both password don't match" })
            setInputs({ ...inputs, 'password': '', 'repassword': '' })

        }
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
            </div>
        )
    }
}

export default Profile