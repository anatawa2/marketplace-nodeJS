import * as React from 'react';
import { useState, useEffect } from 'react'

import AppBar from '../components/AppBar';
import { getAxios } from '../utils/axios'
import { tokenExist } from '../utils/tokenHandler'
import ListProducts from '../components/ListProducts';

function Store() {

  const [myUser, setMyUser] = useState('')
  const [listItem, setListItem] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const endpoint = "http://192.168.1.125:8080/"

  const getMyUser = () => {
    if (tokenExist()) {
      getAxios(endpoint + 'setting').then(({ data }) => {
        setMyUser(data.user)
      })
    }
  }

  useEffect(() => {
    getMyUser()
    getAxios(endpoint).then(({ data }) => {
      setListItem(data.product)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return (<div>Loading</div>)
  else return (
    <div>
      <AppBar avatar={myUser.avatar} name={myUser.name} />
      <ListProducts listItem={listItem} />
    </div>
  )
}

export default Store