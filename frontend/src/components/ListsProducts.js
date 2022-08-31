import React from 'react'

import {
    CardContent, Box, Card, Grid,
    CardMedia, Typography
} from '@mui/material'

function ListsProducts({ listsItem, category }) {

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const pointer = {
        cursor: "pointer"
    }

    return (
        <Box sx={{ bgcolor: '#18191A', p: 4, borderLeft: 1, borderColor: '#393A3B', minHeight: '100%' }}>
            <Typography variant='h6' sx={{ mb: 3 }}>
                {category ? category : "Today's picks"}
            </Typography>
            <Grid container spacing={1.5}  >
                {listsItem && listsItem.map((data, idx) => (
                    <Grid item key={idx} xs={6} sm={6} md={6} lg={4} xl={3}>
                        <a style={pointer} href={"/marketplace/product/" + data.slug}
                            onClick={() => localStorage.setItem('scrollPosition', window.pageYOffset)}
                        >
                            <Card
                                sx={{ display: 'flex', flexDirection: 'column', boxShadow: 'none' }}
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
                        </a>
                    </Grid>
                ))}

            </Grid>
        </Box >
    )
}

export default ListsProducts