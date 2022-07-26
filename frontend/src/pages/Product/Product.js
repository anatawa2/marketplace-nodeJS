import * as React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import AppBar from '../../components/AppBar'
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import CardContent from '@mui/material/CardContent';

import { useParams } from 'react-router-dom'
import { getAxios } from '../../utils/axios'
import { tokenExist } from '../../utils/tokenHandler'

export default function Product() {

  const { slug } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState([])
  const [myUser, setMyUser] = useState([])
  const [product, setProduct] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const myEndpoint = "http://192.168.1.125:8080/setting/"
  const endpoint = "http://192.168.1.125:8080/product/" + slug

  const getMyUser = () => {
    if (tokenExist()) {
      getAxios(myEndpoint).then(({ data }) => {
        setMyUser(data.user)
      })
    }
  }
  useEffect(() => {
    getMyUser()
    getAxios(endpoint).then(({ data }) => {
      if (!data.product) return navigate('/404')
      console.log(data);
      setProduct(data.product)
      setUser(data.user)
      setIsLoading(false)
    })

  }, [endpoint, navigate])

  if (isLoading) return (<div>Loading</div>)
  else return (
    <div>
      <AppBar avatar={myUser.avatar} name={myUser.name} />
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
                {product.images && product.images.map((img, idx) => (
                  <CardMedia
                    key={idx}
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={img}
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