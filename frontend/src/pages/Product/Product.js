import * as React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import {
  CardContent, Typography, CardMedia, Container,
  Grid, Card, Link, Box
} from '@mui/material';

import AppBar from '../../components/AppBar'
import { useParams } from 'react-router-dom'
import { getAxios } from '../../utils/axios'
import { tokenExist } from '../../utils/tokenHandler'

export default function Product() {

  const { slug } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState([])
  const [myUser, setMyUser] = useState({ name: '', avatar: '' })
  const [product, setProduct] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const myEndpoint = "http://192.168.1.125:8080/setting/"
  const endpoint = "http://192.168.1.125:8080/product/" + slug

  const getMyUser = async () => {
    if (!tokenExist()) return;
    const { data } = await getAxios(myEndpoint)
    setMyUser(data.user)
  }

  const getProduct = async () => {
    const { data } = await getAxios(endpoint)
    if (!data.product) return navigate('/404')
    setProduct(data.product)
    setUser(data.user)
    setIsLoading(false)
  }

  useEffect(() => {
    getMyUser()
    getProduct()

  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) return (<div>Loading</div>)
  else return (
    <div>
      <AppBar avatar={myUser.avatar} name={myUser.name} />

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