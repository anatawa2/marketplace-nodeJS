import React from 'react'


import { CardContent, Box, Card, Grid, Link, CardMedia, Typography, } from '@mui/material'

function ListsProducts({ listsItem, category }) {

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <Box sx={{ bgcolor: '#18191A', p: 4 }}>
            <Typography variant='h6' sx={{ mb: 3 }}>
                {category ? category : "Today's picks"}
            </Typography>
            <Grid container spacing={1.5}  >
                {listsItem && listsItem.map((data) => (
                    <Grid item key={data._id} xs={6} sm={6} md={6} lg={4} xl={3}>
                        <Link href={"/product/" + data.slug} style={{ textDecoration: 'none' }} >
                            <Card
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 'none' }}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{ borderRadius: '6px' }}
                                    height="340"
                                    image={data.images && (data.images[0])}
                                    alt="img"
                                />
                                <CardContent sx={{ bgcolor: '#18191A' }}>
                                    <Typography variant="h6" >
                                        ฿ {numberWithCommas(data.price)}
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
        </Box>
    )
}

export default ListsProducts