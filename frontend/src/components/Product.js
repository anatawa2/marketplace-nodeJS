import * as React from 'react';
import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { useNavigate } from "react-router-dom";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PrimarySearchAppBar from './AppBar'

import { useParams } from 'react-router-dom';
import { getAxios } from '../utils/axios'
const theme = createTheme();

export default function Product() {

  const { slug } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState([])

  useEffect(() => {

    const endpoint = "http://192.168.1.125:8080/product/" + slug
    setIsLoading(true)
    getAxios(endpoint, setProduct)
    setIsLoading(false)

  }, [slug])

  if (isLoading) return (<div>Loading</div>)
  else return (
    <ThemeProvider theme={theme}>
      <PrimarySearchAppBar />
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    // 16:9
                    pt: '56.25%',
                  }}
                  image={product.image && product.image[0]}
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography>
                    $ {product.price}
                  </Typography>
                  <Typography>
                    {product.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
    </ThemeProvider >
  )
}