import * as React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar'
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';

import { getAxios } from '../utils/axios'
import { useParams } from 'react-router-dom';
import { tokenExist } from '../utils/tokenHandler'

function Profile() {

  const { slug } = useParams()
  const navigate = useNavigate()
  const [myUser, setMyUser] = useState({ name: '' })
  const [profile, setProfile] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [listsProduct, setListsProduct] = useState([])
  const myEndpoint = "http://192.168.1.125:8080/setting/"
  const endpoint = "http://192.168.1.125:8080/profile/" + slug

  const getMyUser = async () => {
    if (!tokenExist()) return;
    const { data } = await getAxios(myEndpoint)
    setMyUser(data.user)
  }

  const getProfile = async () => {
    const { data } = await getAxios(endpoint)
    if (data.err) return navigate('/404')
    setListsProduct(data.lists)
    setProfile(data.user)
  }

  useEffect(() => {
    setIsLoading(true)
    getMyUser()
    getProfile()
    setIsLoading(false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps   

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
            pt: 4,
            pb: 3,
          }}
        >
        </Box>

        <img src={profile.avatar} width="150" height="150" alt="avatar" />
        {profile.name}

        <Container sx={{ py: 3 }} maxWidth="md">
          {/* End hero unit */}
          {listsProduct && listsProduct.map((product) => (
            <Grid key={product._id} container spacing={4} >
              <Grid item xs={12} sm={6} md={4} >
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
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