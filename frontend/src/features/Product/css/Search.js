import * as React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { getAxios } from '../../utils/axios'

import MyAppBar from '../../components/AppBar';
import SideBar from '../../components/SideBar';
import ListsProducts from '../../components/ListsProducts';
import {
  Stack, Grid, Box
}
  from '@mui/material';

import { useParams } from 'react-router-dom';
import styles from '../../components/css/view.module.css';


function Search() {

  const { slug } = useParams()
  const [cate, setCate] = useState('')
  const navigate = useNavigate()
  const [listsItem, setListsItem] = useState([])
  const endpoint = "http://192.168.1.125:8080/search/" + slug

  const getLists = async () => {
    setCate(` search : ${slug}`)
    if (slug === '') navigate('/')

    const { data } = await getAxios(endpoint)
    if (data.product.length === 0) setCate('Not Found')
    setListsItem(data.product)
  }

  useEffect(() => {
    slug && getLists()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps  
  return (
    <Stack spacing={7}> {/*appbar*/} 
    </Stack >
  )
}

export default Search