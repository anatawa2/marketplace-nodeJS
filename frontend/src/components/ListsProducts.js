import React from 'react'

import {
    CardContent, Box, Card, Grid,
    CardMedia, Typography
} from '@mui/material'

function ListsProducts({ listsItem, category, page }) {

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const pointer = {
        cursor: "pointer"
    }

    let bg, bdl, bdc, frame
    if (page === 'profile') {
        bg = '#242526'
        frame = '1px solid #393A3B'
    } else { //home & category
        bg = '#18191A'
        bdl = 1
        bdc = '#393A3B' 
    }

    return (
        <Box sx={{
            bgcolor: bg,
            minHeight: '100%',
            p: 4,
            borderLeft: bdl,
            borderColor: bdc,
            border: frame,
        }}>
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
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: 'none'
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{ borderRadius: '6px' }}
                                    height="340"
                                    image={data.images && (data.images[0])}
                                    alt="img"
                                />
                                <CardContent sx={{ bgcolor: bg }}>
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