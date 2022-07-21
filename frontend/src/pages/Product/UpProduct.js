import React from 'react'
import { FormProduct } from '../../components/FormProduct'

function UpProduct() {
    let inputs = ''
    let handleSubmit = ''
    let handleChange = ''
    let selectedImages = ''
    let removeImages = ''
    let onSelectFile = ''

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

export default UpProduct