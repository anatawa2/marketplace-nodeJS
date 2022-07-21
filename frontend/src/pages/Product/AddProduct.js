import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

// import { useParams } from 'react-router-dom';
import { postAxios } from '../../utils/axios'
import { tokenExist } from '../../utils/tokenHandler'
import { FormProduct } from '../../components/FormProduct'

export default function AddProduct() {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [inputs, setInputs] = useState({})
    const [selectedImages, setSelectedImages] = useState([])
    const [fileList, setFileList] = useState({})

    useEffect(() => {
        if (!tokenExist()) navigate('/')
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

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    } 

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)

        let formData = new FormData();
        // IMG        
        for (let i in fileList) {
            formData.append('images', fileList[i])
        }
        // inputs
        for (let i in inputs) {
            formData.append(i, inputs[i])
        }

        const endpoint = "http://192.168.1.125:8080/product/add"
        const res = await postAxios(endpoint, formData)
        if (res.data.status === 'ok') {
            Swal.fire({ title: 'Done!', icon: 'success' })
            setIsLoading(false)
                (navigate('/'))
        } else {
            Swal.fire({ icon: 'error', text: res.data.err })
                (navigate('/'))
        }
    }

    if (isLoading) return (<div>Loading</div>)
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

