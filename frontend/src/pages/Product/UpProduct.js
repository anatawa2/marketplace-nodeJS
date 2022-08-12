
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'

import { Swal } from '../../utils/Swal'
import AppBar from '../../components/AppBar';
import { useParams } from 'react-router-dom';
import { tokenExist } from '../../utils/tokenHandler'
import { getAxios, patchAxios } from '../../utils/axios'
import { FormProduct } from '../../components/FormProduct'

function UpProduct() {

    const [myUser, setMyUser] = useState('')
    const [inputs, setInputs] = useState({})
    const [fileLists, setFileLists] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [delImages, setDelImages] = useState([])
    const [selectedImages, setSelectedImages] = useState([])

    const { slug } = useParams()
    const navigate = useNavigate()
    const userEndpoint = "http://192.168.1.125:8080/setting"
    const getEndpoint = "http://192.168.1.125:8080/product/" + slug
    const patchEndpoint = "http://192.168.1.125:8080/product/update/" + slug

    const getProduct = async () => {
        if (!tokenExist()) return navigate('/login')

        const { data: { user } } = await getAxios(userEndpoint)
        setMyUser(user)

        const { data: { product } } = await getAxios(getEndpoint)
        if (!product) return navigate('/404')
        setInputs(product)

        //verify
        if (user._id !== product.owner) return navigate('/')

        let myImg = product.images
        myImg.forEach((item) => {
            setSelectedImages(value => ([...value, item]))
        })
        setIsLoading(false)
    }

    useEffect(() => {
        getProduct()

    }, []) // eslint-disable-line react-hooks/exhaustive-deps  

    function onSelectFile(event) {
        const selectedFiles = event.target.files
        const selectedFilesArray = Array.from(selectedFiles)
        const imagesArray = selectedFilesArray.map((file) => {
            //blob to preview 
            let blob = URL.createObjectURL(file)
            setFileLists(values => ({ ...values, [blob.slice(-6,)]: file }))
            return blob
        })
        setSelectedImages(selectedImages.concat(imagesArray))
    }

    function removeImages(imageSrc) {
        let clone = Object.entries(fileLists)
        setFileLists({}) //clone to array and empty it
        for (let file of clone) {
            if (file[0] !== imageSrc.slice(-6,)) {
                setFileLists(values => ({ ...values, [file[0]]: file[1] }))
            }
        }
        setDelImages(prev => ([...prev.concat(imageSrc)]))
        setSelectedImages(selectedImages.filter((img) => img !== imageSrc))
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData();

        for (let i in inputs) { // inputs
            formData.append(i, inputs[i])
        }
        for (let i in fileLists) { // IMG      
            formData.append('images', fileLists[i])
        }
        for (let i in delImages) { // DEL
            formData.append('delImages', delImages[i])
        }

        const { data } = await patchAxios(patchEndpoint, formData)
        if (data.err) return Swal.err(data.err)
        Swal.ok()
        navigate('/product/' + data.slug)

    }

    if (isLoading) return (<div>Loading</div>)
    else
        return (
            <div>
                <AppBar avatar={myUser.avatar} name={myUser.name} />
                <FormProduct
                    inputs={inputs}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    selectedImages={selectedImages}
                    removeImages={removeImages}
                    onSelectFile={onSelectFile}
                />
            </div>
        )

}

export default UpProduct