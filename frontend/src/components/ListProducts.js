import React from 'react'


import { CardContent, Box, Card, Grid, Link, CardMedia, Typography, } from '@mui/material'

function ListProducts({ listItem, category }) {
    return (
        <Box sx={{ bgcolor: '#18191A', p: 4 }}>
            <Typography variant='h6' sx={{ mb: 3 }}>
                {category? category:"Today's picks"} 
            </Typography>
            <Grid container spacing={1.5}  >
                {listItem && listItem.map((data) => (
                    <Grid item key={data._id} xs={6} sm={4} md={4} xl={3}>
                        <Link href={"/product/" + data.slug} style={{ textDecoration: 'none' }} >
                            <Card
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 'none' }}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{ borderRadius: '6px' }}
                                    image={data.images && (data.images[0])}
                                    alt="img"
                                />
                                <CardContent sx={{ flexGrow: 1, bgcolor: '#18191A' }}>
                                    <Typography variant="h6" >
                                        ฿ {data.price}
                                    </Typography >
                                    <Typography variant="body1">
                                        {data.name}
                                    </Typography>
                                    <Typography variant="caption" >
                                        {data.date}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}

            </Grid>

            {/* Footer */}
            <Box sx={{ bgcolor: '#d666', p: 6 }} component="footer">
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
        </Box>
    )
}

export default ListProducts