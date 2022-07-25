import React from 'react'

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import PrimarySearchAppBar from '../components/AppBar'

function ListProducts({ listItem }) {
    return (
        <div>
            <PrimarySearchAppBar />
            <CssBaseline />

            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Album layout
                        </Typography>

                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button href="/product/add" variant="contained">Add Product</Button>
                            <Button variant="outlined">Secondary action</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {listItem && listItem.map((data) => (
                            <Grid item key={data._id} xs={12} sm={6} md={4}>
                                <Link href={"/product/" + data.slug} style={{ textDecoration: 'none' }} >
                                    <Card
                                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                    >
                                        <CardMedia
                                            component="img"
                                            sx={{
                                                // 16:9
                                                pt: '56.25%',
                                            }}
                                            image={data.images && (data.images[0])}
                                            alt="random"
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {data.name}
                                            </Typography>
                                            <Typography>
                                                {data.desc}
                                            </Typography>
                                            <Typography>
                                                {data.date}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Grid>
                        ))}

                    </Grid>
                </Container>
            </main>

            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
                </Typography>
            </Box>
            {/* End footer */}
            <Grid item xs={12}>
                <Link href="/login" variant="body2">
                    Login
                </Link>
            </Grid>
            <Grid item xs={12}>
                <Link href="/register" variant="body2">
                    Register
                </Link>
            </Grid>
        </div>
    )
}

export default ListProducts