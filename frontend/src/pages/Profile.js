import * as React from 'react';
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PrimarySearchAppBar from '../components/AppBar'
import Link from '@mui/material/Link';

import { useParams } from 'react-router-dom';
import { getAxios } from '../utils/axios'

function Profile() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [listProduct, setListProduct] = useState([])
  const [profile, setProfile] = useState([])
  const endpoint = "http://192.168.1.125:8080/profile/" + slug

  useEffect(() => {

    setIsLoading(true)
    getAxios(endpoint).then(res => {
      console.log(res.data.list);
      if (res.data.status === 'ok') {
        setListProduct(res.data.list)
        setProfile(res.data.user)
        setIsLoading(false)
      } else {
        Swal.fire({ icon: 'question', text: 'User not found' })
        navigate('/')
      }
    })

  }, [endpoint, navigate])

  if (isLoading) return (<div>Loading</div>)
  else return (
    <div>
      <PrimarySearchAppBar />
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 4,
            pb: 3,
          }}
        >
        </Box>

        <img src={'/images/users/' + profile.avatar} width="150" height="150" alt="avatar" />
        {profile.name}

        <Container sx={{ py: 3 }} maxWidth="md">
          {/* End hero unit */}
          {listProduct && listProduct.map((product) => (
            <Grid key={product._id} container spacing={4} >
              <Grid item xs={12} sm={6} md={4} >
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
                  {product.image && product.image.map((img, idx) => (
                    <CardMedia
                      key={idx}
                      component="img"
                      sx={{
                        // 16:9
                        pt: '56.25%',
                      }}
                      image={'/images/products/' + img}
                      alt="random"
                    />
                  ))}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Link href={"/product/" + product.slug} style={{ textDecoration: 'none' }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {product.name}
                      </Typography>
                    </Link>
                    <Typography >
                      ฿ {product.price}
                    </Typography>
                    <Typography>
                      Description: {product.desc}
                    </Typography>
                    <Typography>
                      condition: {product.condition}
                    </Typography>
                    <Link href={"/profile/" + product.owner} variant="body2">
                    </Link>
                    <Typography>
                      Date: {product.date}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ))}

        </Container>
      </main>
    </div >
  )
}

export default Profile