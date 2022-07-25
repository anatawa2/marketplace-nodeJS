import { useState, useEffect } from 'react'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import PrimarySearchAppBar from '../../components/AppBar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { Swal } from '../../utils/Swal'
import { useNavigate } from "react-router-dom";
import { tokenExist } from '../../utils/tokenHandler'
import { getAxios, patchAxios } from '../../utils/axios'



function Profile() {

    const navigate = useNavigate()
    const [inputs, setInputs] = useState({})
    const [isLoaded, setIsLoaded] = useState(true);
    const [password, setPassword] = useState(false);
    const endpoint = 'http://192.168.1.125:8080/setting/'

    const [fileList, setFileList] = useState([])
    const [newAvatar, setnewAvatar] = useState()

    function onSelectFile(event) {
        const selectedFiles = event.target.files
        const imagesArray = URL.createObjectURL(selectedFiles[0])

        // setInputs(value => ({ ...value, 'avatar': imagesArray }))
        setFileList(selectedFiles)
        setnewAvatar(imagesArray)
    }

    useEffect(() => {

        if (!tokenExist()) navigate('/login')
        // GET PROFILE
        getAxios(endpoint).then(({ data }) => { 
            if (!data.user) return navigate('/login')
            setInputs(data.user)
            setIsLoaded(false)
        })

    }, []) // eslint-disable-line react-hooks/exhaustive-deps   

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {

        event.preventDefault()

        let formData = new FormData()
        formData.append('avatar', fileList[0]) // IMG   

        for (let i in inputs) {
            formData.append(i, inputs[i]) // inputs
        }

        patchAxios(endpoint, formData).then(({ data }) => {
            if (data.err) return Swal.err(data.err)
            Swal.ok()
        })
        setInputs({ ...inputs, 'password': '', 'repassword': '' })
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
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <div>
                                        {inputs.avatar
                                            ?
                                            <img src={newAvatar || (inputs.avatar)} width="150" height="150" alt="upload" />
                                            :
                                            <img src={"/profile.jpg"} width="150" height="150" alt="upload" />
                                        }
                                        <Button
                                            variant="contained" component="label" >
                                            Upload
                                            <input name='avatar' onClick={(event) => { event.target.value = null }}
                                                onChange={onSelectFile} type="file" accept="image/*" hidden />
                                        </Button>
                                    </div>
                                </Stack>
                            </Stack>
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
                                <Button
                                    onClick={(val) => (setPassword(true))}
                                >
                                    Change Password
                                </Button>
                                {password && <>
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
                                </>}
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