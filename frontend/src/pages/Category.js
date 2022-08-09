import * as React from 'react';

import SideBar from '../components/SideBar';
import MyAppBar from '../components/AppBar';
import ListProducts from '../components/ListProducts';
 
import { getAxios } from '../utils/axios'
import { useState, useEffect } from 'react'
import { tokenExist } from '../utils/tokenHandler'
import { useParams, useNavigate } from 'react-router-dom';

import {
    Stack, Grid
}
    from '@mui/material';

function Category() {

    const { slug } = useParams()
    const navigate = useNavigate()
    const [myUser, setMyUser] = useState({ name: '' })
    const [listItem, setListItem] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const userEndpoint = "http://192.168.1.125:8080/setting"
    const endpoint = "http://192.168.1.125:8080/category/" + slug

    const getMyUser = async () => {
        if (!tokenExist()) return;
        const { data } = await getAxios(userEndpoint)
        setMyUser(data.user)
    }

    const getList = async () => {
        const { data } = await getAxios(endpoint)
        if (data.err) return navigate('/404')
        setListItem(data.list)
        setIsLoading(false)
    }

    useEffect(() => {
        getMyUser()
        getList()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps   

    if (isLoading) return <div>Loading</div>
    else return (
        <Stack spacing={6}>
            <MyAppBar avatar={myUser.avatar} name={myUser.name} />
            <Grid container >
                <Grid item xl={3} lg={3} md={4} >
                    <SideBar />
                </Grid>
                <Grid item xl={9} lg={9} md={8} xs={12} >
                    <ListProducts listItem={listItem} category={slug} />
                </Grid>
            </Grid>
        </Stack>
    )
}

export default Category