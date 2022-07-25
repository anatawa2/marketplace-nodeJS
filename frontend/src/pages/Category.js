import * as React from 'react';

import { Swal } from '../utils/Swal'
import { getAxios } from '../utils/axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Page404 from './Page404'
import ListProducts from '../components/ListProducts';

function Category() {

    const { slug } = useParams()
    const navigate = useNavigate()
    const [listItem, setListItem] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const endpoint = "http://192.168.1.125:8080/category/" + slug

    console.log('start');
    console.log(slug);
    useEffect(() => {
        getAxios(endpoint).then(({ data }) => {
            console.log(data);
            if (data.err) return Swal.err(data.err)
            setListItem(data.list)
            setIsLoading(false)
        })
    }, [endpoint, navigate])

    if (isLoading) return <Page404 />
    else return (
        <div>
            <ListProducts listItem={listItem} />
        </div>
    )
}

export default Category