import * as React from 'react';

import Page404 from './Page404'
import AppBar from '../components/AppBar'
import ListProducts from '../components/ListProducts';

import { Swal } from '../utils/Swal'
import { getAxios } from '../utils/axios'
import { useState, useEffect } from 'react'
import { tokenExist } from '../utils/tokenHandler'
import { useParams, useNavigate } from 'react-router-dom';

function Category() {

    const { slug } = useParams()
    const navigate = useNavigate()
    const [myUser, setMyUser] = useState('')
    const [listItem, setListItem] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const userEndpoint = "http://192.168.1.125:8080/setting"
    const endpoint = "http://192.168.1.125:8080/category/" + slug

    const getUser = () => {
        if (tokenExist()) {
            getAxios(userEndpoint).then(({ data }) => {
                setMyUser(data.user)
            }) 
        }
    }

    useEffect(() => {
        getUser()
        getAxios(endpoint).then(({ data }) => {
            if (data.err) return Swal.err(data.err)
            setListItem(data.list)
            setIsLoading(false)
        })
    }, [endpoint, navigate])

    if (isLoading) return <Page404 />
    else return (
        <div>
            <AppBar avatar={myUser.avatar} name={myUser.name} />
            <ListProducts listItem={listItem} />
        </div>
    )
}

export default Category