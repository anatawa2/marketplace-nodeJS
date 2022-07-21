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
import AppBar from '../../components/AppBar'
import Link from '@mui/material/Link';

import { useParams } from 'react-router-dom';
import { getAxios } from '../../utils/axios'

export default function Product() {

  const navigate = useNavigate()
  const { slug } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState([])
  const [user, setUser] = useState([])
  const endpoint = "http://192.168.1.125:8080/product/" + slug

  useEffect(() => {

    setIsLoading(true)
    getAxios(endpoint).then(res => {
      console.log(res.data);
      if (res.data.status === 'ok') {
        setProduct(res.data.item)
        setUser(res.data.user)
        setIsLoading(false)
      } else {
        Swal.fire({ icon: 'question', text: res.data.err })
        navigate('/')
      }
    })

  }, [slug, endpoint, navigate])

  if (isLoading) return (<div>Loading</div>)
  else return (
    <div>
      <AppBar avatar={user.avatar} name={user.name} />
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 2,
            pb: 3,
          }}
        >
        </Box>
        <Container sx={{ py: 3 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4} >
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                {product.image && product.image.map((img,idx) => (
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
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography>
                    ฿ {product.price}
                  </Typography>
                  <Typography>
                    Description :{product.desc}
                  </Typography>
                  <Typography>
                    condition {product.condition}
                  </Typography>
                  <Link href={"/profile/" + product.owner} variant="body2">
                    <Typography>
                      By : {user.name}
                    </Typography>
                  </Link>
                  <Typography>
                    Date :{product.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid>
            <Link href={"/product/update/" + product.slug} variant="body2">
              Update
            </Link>
          </Grid>
          <Grid>
            <Link href={"/product/delete/" + product.slug} variant="body2">
              Delete
            </Link>
          </Grid>
        </Container>
      </main>
    </div>
  )
}