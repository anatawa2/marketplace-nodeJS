import Swal from 'sweetalert2'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { delAxios } from '../../utils/axios'
import { tokenExist } from '../../utils/tokenHandler'

function DelProduct() {

    const navigate = useNavigate()
    const { slug } = useParams()
    const endpoint = "http://192.168.1.125:8080/product/delete/" + slug

    useEffect(() => {
        if (!tokenExist()) navigate('/')
        const deleteProduct = async () => {
            const res = await delAxios(endpoint)
            if (res.data.status === 'ok') {
                Swal.fire({ title: res.data.message, icon: 'success' })
                navigate('/store')
            } else {
                Swal.fire({ icon: 'question', text: res.data.err })
            }
        }
        deleteProduct()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps   
}
export default DelProduct