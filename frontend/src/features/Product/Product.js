import * as React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import moment from "moment";

import {
  Avatar, Box,
} from '@mui/material';

import styles from './css/product.module.css'
import img from './css/images.module.css'

import AppBar from '../../components/AppBar'
import { useParams } from 'react-router-dom'
import { getAxios } from '../../utils/axios'

export default function Product() {

  const { slug } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState([])
  const [myUser, setMyUser] = useState({ name: '' })
  const [product, setProduct] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const myEndpoint = "http://192.168.1.125:8080/setting"
  const endpoint = "http://192.168.1.125:8080/product/" + slug

  const getMyUser = async () => {
    const { data: { user } } = await getAxios(myEndpoint)
    if (user) setMyUser(user)
  }

  const [showImg, setShowImg] = useState()

  const getProduct = async () => {
    const { data } = await getAxios(endpoint)
    if (!data.product) return navigate('/404', { replace: true })
    setIsLoading(false)
    setProduct(data.product)
    setUser(data.user)
    setShowImg(data.product.images[0])
  }

  useEffect(() => {
    getProduct()
    getMyUser()

  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const changeHandle = (val) => {
    setShowImg(val)
  }

  const selectImage = (x) => {
    let index = product.images.indexOf(showImg)
    let point = index + x
    let stock = product.images.length - 1

    if (point > stock) {
      point = 0
    }
    if (point < 0) {
      point = stock
    }
    setShowImg(product.images[point])
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const timeString = (t) => {
    let now = new Date(t)
    return moment(now).subtract(10, 'days').calendar();
  }

  if (isLoading) return <AppBar />
  else return (
    <>
      <AppBar />

      {/* IMAGE */}
      <Box className={styles.flexContainer} >

        <Box className={styles.item1}>

          <div className={img.box}>
            <div onClick={() => navigate(-1)} className={img.back} >X</div>

            {product.images.length > 1 &&
              <>
                <div className={img.btn} >
                  <div onClick={() => selectImage(-1)} >
                    &lt;
                  </div>
                  <div onClick={() => selectImage(1)} >
                    &gt;
                  </div>
                </div>
              </>
            }

            <div className={img.image}>
              <img src={showImg} alt='pic' />
            </div>
          </div>

          {/* Lists */}
          <div className={img.lists}>
            {product.images.map((val, idx) => (
              <div key={idx} className={img.item} onClick={() => changeHandle(val)}>
                <div className={val === showImg ? img.img1 : img.img0}>
                  <img src={val} alt={idx} />
                </div>
              </div>
            ))}
          </div>


          {/* BG */}
          <div className={styles.bg}><img alt='pic' src={showImg} /></div>

        </Box>

        {/* DESCRIPTION */}
        <Box className={styles.item2}>
          <div className={styles.text}>
            <h2>{product.name}</h2>
            <p>-------Detail-------</p>
            <p>฿ {numberWithCommas(product.price)}</p>
            <p>Condition : {product.condition}</p>
            <p>{product.desc}</p>
            <h5>Last update : {timeString(product.updatedAt)}</h5>
          </div>

          {/* Profile */}
          <div className={styles.badge} >
            <p>Seller Information</p>
            <div onClick={() => navigate('/marketplace/profile/' + user._id)}  >
              <div className={styles.profile}>
                <Avatar alt={user.name} src={user.avatar}
                  sx={{
                    bgcolor: '#3A3B3C',
                    width: 60, height: 60,
                  }} />
                <p>{user.name}</p>
              </div>
            </div>
            Joined Facebook in 2022
          </div>

          {/* Button */}
          {myUser.name === user.name
            ?
            <div onClick={() => navigate(`/marketplace/product/update/${slug}`)}
              className={styles.pointer}>
              <div className={styles.buttonx}>
                Update
              </div>
            </div>
            :
            <div onClick={() => navigate(`/messenger/inbox/${user._id}`)} className={styles.pointer}>
              <div className={styles.buttonx}>
                Send
              </div>
            </div>
          }

        </Box>
      </Box>
    </>
  )
}