import * as React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import {
  Box, Button
} from '@mui/material';

import '../../components/theme/product.css'

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

  // const timeString = (t) => {
  //   let now = new Date(t)
  //   return now.toDateString()
  // }


  if (isLoading) return (<div>Loading</div>)
  else return (
    <>

      <AppBar avatar={myUser.avatar} name={myUser.name} />

      {/* IMAGE */}
      <Box className='flexContainer'>

        <Box className='item1'>

          <div class="bg-image"><img alt='pic' src={product.images} /></div>
          
          

        </Box>

        {/* DESCRIPTION */}
        <Box className='item2'>

          <div class="desc">             
          </div>

        </Box>

      </Box>

    </>
  )
}