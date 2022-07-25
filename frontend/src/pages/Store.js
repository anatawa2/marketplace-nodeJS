import * as React from 'react';
import { useState, useEffect } from 'react'

import { getAxios } from '../utils/axios'
import ListProducts from '../components/ListProducts';

function Store() {

  const [isLoading, setIsLoading] = useState(true)
  const [listItem, setListItem] = useState([])
  const endpoint = "http://192.168.1.125:8080/"

  useEffect(() => {
    getAxios(endpoint).then(({ data }) => {
      setListItem(data)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return (<div>Loading</div>)
  else return (
    <ListProducts listItem={listItem} />
  )
}

export default Store