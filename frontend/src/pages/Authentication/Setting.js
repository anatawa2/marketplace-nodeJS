import { useState, useEffect } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import {
    Typography, TextField, Container, Button,
    Avatar, Stack, Grid, Box
} from '@mui/material';

import AppBar from '../../components/AppBar';
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

    const getMyUser = async () => {
        if (!tokenExist()) navigate('/login')
        const { data } = await getAxios(endpoint)
        setInputs(data.user)
        setIsLoaded(false)
    }

    useEffect(() => {
        getMyUser()

    }, []) // eslint-disable-line react-hooks/exhaustive-deps   

    function onSelectFile(event) {
        const selectedFiles = event.target.files
        const imagesArray = URL.createObjectURL(selectedFiles[0])

        // setInputs(value => ({ ...value, 'avatar': imagesArray }))
        setFileList(selectedFiles)
        setnewAvatar(imagesArray)
    }

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (event) => {

        event.preventDefault()
        let formData = new FormData()
        formData.append('avatar', fileList[0]) // IMG   

        for (let i in inputs) {
            formData.append(i, inputs[i]) // inputs
        }

        setInputs({ ...inputs, 'password': '', 'repassword': '' })
        const { data } = await patchAxios(endpoint, formData)
        if (data.err) return Swal.err(data.err)
        Swal.ok()

    }

    if (isLoaded) return (<div>Loading</div>)
    else {
        return (
            <div>
                <AppBar avatar={inputs.avatar} name={inputs.name} />
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.contrastText' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            My Profile
                        </Typography>

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Stack direction="column" alignItems="center" spacing={2}>
                                {inputs.avatar
                                    ?
                                    <img src={newAvatar || (inputs.avatar)} width="150" height="150" alt="upload" />
                                    :
                                    <img src="/images/profile.jpg" width="150" height="150" alt="upload" />
                                }
                                <Button
                                    variant="contained" component="label" >
                                    Upload
                                    <input name='avatar' onClick={(event) => { event.target.value = null }}
                                        onChange={onSelectFile} type="file" accept="image/*" hidden />
                                </Button>
                            </Stack>
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="filled"
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
                                        variant="filled"
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
                                            variant="filled"
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
                                            variant="filled"
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