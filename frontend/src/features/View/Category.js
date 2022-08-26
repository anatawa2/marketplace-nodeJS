import * as React from 'react';

import SideBar from '../../components/SideBar';
import MyAppBar from '../../components/AppBar';
import ListsProducts from '../../components/ListsProducts';

import { getAxios } from '../../utils/axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../../components/css/view.module.css';

import {
    Grid, Stack, Box
}
    from '@mui/material';

function Category() {

    const { slug } = useParams()
    const navigate = useNavigate()
    const [cate, setCate] = useState('Not found item on this category')
    const [listsItem, setListsItem] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const endpoint = "http://192.168.1.125:8080/category/" + slug

    const getLists = async () => {
        const { data } = await getAxios(endpoint)
        if (data.err) return navigate('/404')
        setListsItem(data.lists)
        setIsLoading(false)
        setCate(data?.lists[0]['category'])
    }

    useEffect(() => {
        getLists()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps   

    if (isLoading) return <div>Loading</div>
    else return (
        <Stack spacing={7}> {/*appbar*/}
            <MyAppBar />
            <Box className={styles.container}>
                <Grid container>
                    <Grid item md={4} lg={3} xl={3}>
                        <Box className={styles.sidebar}>
                            <SideBar pathname={slug} />
                        </Box>
                    </Grid>
                    <Grid item md={8} lg={9} xl={9} >
                        <Box className={styles.itemContainer}>
                            <ListsProducts listsItem={listsItem} category={cate} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Stack >
    )
}

export default Category