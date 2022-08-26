import * as React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import {
  Avatar, Box, Link, TextField
} from '@mui/material';

import styles from './css/product.module.css'

import AppBar from '../../components/AppBar'
import { useParams } from 'react-router-dom'
import { getAxios } from '../../utils/axios'

export default function Product() {

  const { slug } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState([])
  const [product, setProduct] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const endpoint = "http://192.168.1.125:8080/product/" + slug

  const getProduct = async () => {
    const { data } = await getAxios(endpoint)
    if (!data.product) return navigate('/404')
    setProduct(data.product)
    setUser(data.user)
    setIsLoading(false)
  }

  useEffect(() => {
    getProduct()

  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // const timeString = (t) => {
  //   let now = new Date(t)
  //   return now.toDateString()
  // }


  if (isLoading) return (<div>Loading</div>)
  else return (
    <>

      <AppBar />

      {/* IMAGE */}
      <Box className={styles.flexContainer}>

        <Box className={styles.item1}>

          <div className={styles.bg}><img alt='pic' src={product.images[0]} /></div>



        </Box>

        {/* DESCRIPTION */}
        <Box className={styles.item2}>
          <div className={styles.desc}>
            <h2>{product.name}</h2>
            <p>Detail</p>
            <p>฿ {product.price}</p>
            <p>Condition : {product.condition}</p>
            <p>{product.desc}</p>

            {/* Profile */}
            <div className={styles.xxx}>
              <p>Seller Information</p>
              <Link href={'/profile/' + user._id} underline="none" color="inherit" >
                <div className={styles.profile}>
                  <Avatar alt={user.name} src={user.avatar}
                    sx={{
                      bgcolor: '#3A3B3C',
                      width: 60, height: 60,
                    }} />

                  <p>{user.name}</p>
                </div>
              </Link>
              Joined Facebook in 2022
            </div>

          </div>

          {/* Message */}
          <div className={styles.messageTab}>
            <Box sx={{ my: 0.7 }}>
              <TextField
                sx={{
                  borderRadius: 3,
                  bgcolor: '#3A3B3C',
                  py: 0.7,
                  pl: 2,
                }}
                fullWidth
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Box>
            {/* Button */}
            <Link href='#' underline="none" color="inherit" >
              <div className={styles.buttonx}>
                Send
              </div>
            </Link>
          </div>

        </Box>
      </Box>

    </>
  )
}