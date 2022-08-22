import { useEffect } from 'react'
import { Swal } from '../../utils/Swal'
import { delAxios } from '../../utils/axios'
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { tokenExist } from '../../utils/tokenHandler'

function DelProduct() {

    const navigate = useNavigate()
    const { slug } = useParams()
    const endpoint = "http://192.168.1.125:8080/product/delete/" + slug

    const deleteProduct = async () => {
        const { data } = await delAxios(endpoint)
        if (data.err) return Swal.err(data.err)
        Swal.ok()
        navigate('/')
    }

    useEffect(() => {
        if (!tokenExist()) return navigate('/login')
        deleteProduct()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps   
}
export default DelProduct