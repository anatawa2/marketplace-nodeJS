import {
    Box, Grid, Stack, Avatar, Button, InputAdornment,
    CssBaseline, Typography, TextField, Container, MenuItem
}
    from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { categories, conditions } from '../utils/categories'

export function FormProduct({ handleSubmit, handleChange,
    selectedImages, removeImages, onSelectFile, inputs }) {
    return (
        <div>
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
                        Add Product
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="filled"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    value={inputs.name || ""}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="filled"
                                    required
                                    fullWidth
                                    type="number"
                                    id="price"
                                    label="Price"
                                    name="price"
                                    value={inputs.price || ""}
                                    onChange={handleChange}
                                    InputProps={inputs.price && {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                ฿
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="filled"
                                    required
                                    id="category"
                                    select
                                    fullWidth
                                    name="category"
                                    label="Category"
                                    value={inputs.category || ''}
                                    onChange={handleChange}
                                >
                                    {categories.map((option) => (

                                        <MenuItem sx={!option.icon ? { pl: 4, m: 1 } : { pl: 1, m: 1 }}
                                            key={option.value}
                                            value={!option.icon ? option.value : undefined}
                                        >

                                            {option.icon ? option.icon : ''} &nbsp;&nbsp;&nbsp;
                                            {option.name}
                                        </MenuItem>
                                    ))}

                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="filled"
                                    required
                                    id="condition"
                                    select
                                    fullWidth
                                    name="condition"
                                    label="Condition"
                                    value={inputs.condition || ''}
                                    onChange={handleChange}
                                >
                                    {conditions.map((option) => (
                                        <MenuItem key={option} value={option} >
                                            {option}
                                        </MenuItem>
                                    ))}

                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    {selectedImages &&
                                        selectedImages.map((imageSrc, idx) => {
                                            return (
                                                <div key={imageSrc}>
                                                    <img src={imageSrc} width="150" height="150" alt="upload" />
                                                    <button onClick={() => removeImages(imageSrc, idx)}
                                                    >Delete
                                                    </button>
                                                    <p>{idx + 1}</p>
                                                </div>
                                            )
                                        }
                                        )}
                                    <Button
                                        variant="contained" component="label" >
                                        Upload
                                        <input name='image' onClick={(event) => { event.target.value = null }}
                                            onChange={onSelectFile} type="file" accept="image/*" multiple hidden />
                                    </Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="filled"
                                    required
                                    fullWidth
                                    multiline
                                    rows={3}
                                    id="desc"
                                    label="Description"
                                    name="desc"
                                    value={inputs.desc || ""}
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
                            Add
                        </Button>

                    </Box>
                </Box>
            </Container>
        </div>
    )
}