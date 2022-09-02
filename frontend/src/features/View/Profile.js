import * as React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import AppBar from '../../components/AppBar'
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';

import ListsProducts from '../../components/ListsProducts';

import { getAxios } from '../../utils/axios'
import { useParams } from 'react-router-dom';

function Profile() {

  const { slug } = useParams()
  const navigate = useNavigate()
  const [profile, setProfile] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [listsProduct, setListsProduct] = useState([])
  const endpoint = "http://192.168.1.125:8080/profile/" + slug

  const getProfile = async () => {
    const { data } = await getAxios(endpoint)
    if (data.err) return navigate('/404')
    setListsProduct(data.lists)
    setProfile(data.user)
    setIsLoading(false)
  }

  useEffect(() => {
    getProfile()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps   

  let stock = ` Marketplace Listings - ${listsProduct.length}`

  if (isLoading) return
  else return (
    <>
      <AppBar />
      <Box
        sx={{
          pt: 4,
          pb: 3,
        }}
      >
      </Box>

      <div className='profile'> 
          <img src={profile.avatar} alt="avatar" />
          <h2>{profile.name}</h2>
          <h4>Bio: {profile.bio}</h4> 
      </div>

      <Container>
        <ListsProducts listsItem={listsProduct} category={stock} page={'profile'} />
      </Container>
    </>
  )
}

export default Profile