import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import { Swal } from '../../utils/Swal'
import { postAxios } from '../../utils/axios'
import { tokenExist } from '../../utils/tokenHandler'
import { FormProduct } from '../../components/FormProduct'

export default function AddProduct() {

    const navigate = useNavigate()
    const [inputs, setInputs] = useState({})
    const [fileList, setFileList] = useState({})
    const [selectedImages, setSelectedImages] = useState([])

    useEffect(() => {
        if (!tokenExist()) navigate('/login')
    })

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
        setSelectedImages(selectedImages.filter((img) => img !== imageSrc))
    }
    console.log('inputs', inputs);
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
        // multer
        let x = inputs
        if (x.name && x.price && x.category && x.condition && x.desc) {
            for (let i in fileList) { // IMG  
                formData.append('images', fileList[i])
            }
        }
        const endpoint = "http://192.168.1.125:8080/product/add"
        const { data } = await postAxios(endpoint, formData) 
        if (!data.status) return Swal.err(data.err)
        Swal.ok()
        navigate('/product/' + data.slug)

    }

    if (tokenExist()) {
        return (
            <FormProduct
                inputs={inputs}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                selectedImages={selectedImages}
                removeImages={removeImages}
                onSelectFile={onSelectFile}
            />
        )
    }
}

