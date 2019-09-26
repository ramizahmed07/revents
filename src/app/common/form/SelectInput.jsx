import React, {Component} from 'react'
import { Button } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {uploadEventImage} from '../../../features/user/userActions'



class ImageUpload extends Component {
    
    handleChange = (event) => {
        const image = event.target.files[0]
        const name = image.name
        this.props.uploadEventImage(image, name)
    }

    handleEditImage = () => {
        const fileInput = document.getElementById('imageInput')
        fileInput.click();
    }

    render() { 
        return (
            <div>
                <input type='file' id='imageInput' hidden='hidden' onChange={this.handleChange}/>
                <Button style={{width: '100%', marginBottom: '10px'}} type='button' onClick={this.handleEditImage}>Upload Event Images</Button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadEventImage: (image, name) => dispatch(uploadEventImage(image, name))
    }
}

export default connect(null, mapDispatchToProps)(ImageUpload);