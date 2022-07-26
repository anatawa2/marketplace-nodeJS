
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'

import { Swal } from '../../utils/Swal'
import AppBar from '../../components/AppBar';
import { useParams } from 'react-router-dom';
import { tokenExist } from '../../utils/tokenHandler'
import { getAxios, patchAxios } from '../../utils/axios'
import { FormProduct } from '../../components/FormProduct'

function UpProduct() {

    const [user, setUser] = useState('')
    const [inputs, setInputs] = useState({})
    const [fileList, setFileList] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [delImages, setDelImages] = useState([])
    const [selectedImages, setSelectedImages] = useState([])

    const { slug } = useParams()
    const navigate = useNavigate()
    const getEndpoint = "http://192.168.1.125:8080/product/" + slug
    const patchEndpoint = "http://192.168.1.125:8080/product/update/" + slug

    useEffect(() => {
        // GET PRODUCT 
        if (!tokenExist()) navigate('/login')
        getAxios(getEndpoint).then(({ data }) => {

            if (!data.product) return navigate('/404')
            setInputs(data.product)
            setUser(data.user)
            setIsLoading(false)

            let myImg = data.product.images
            myImg.forEach((item) => {
                setSelectedImages(value => ([...value, item]))
            })
        })

    }, []) // eslint-disable-line react-hooks/exhaustive-deps  

    function onSelectFile(event) {
        const selectedFiles = event.target.files
        const selectedFilesArray = Array.from(selectedFiles)
        const imagesArray = selectedFilesArray.map((file) => {
            //blob to preview 
            let blob = URL.createObjectURL(file)
            setFileList(values => ({ ...values, [blob.slice(-6,)]: file }))
            return blob
        })
        setSelectedImages(selectedImages.concat(imagesArray))
    }

    function removeImages(imageSrc) {
        let clone = Object.entries(fileList)
        setFileList({}) //clone to array and empty it
        for (let file of clone) {
            if (file[0] !== imageSrc.slice(-6,)) {
                setFileList(values => ({ ...values, [file[0]]: file[1] }))
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
        for (let i in fileList) { // IMG      
            formData.append('images', fileList[i])
        }
        for (let i in delImages) { // DEL
            formData.append('delImages', delImages[i])
        }

        await patchAxios(patchEndpoint, formData).then(({ data }) => {
            if (data.err) return Swal.err(data.err)
            Swal.ok()
            navigate('/product/' + data.slug)
        })
    }

    if (isLoading) return (<div>Loading</div>)
    if (tokenExist()) {
        return (
            <div>
                <AppBar avatar={user && user.avatar} name={user && user.name} />
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
}

export default UpProduct