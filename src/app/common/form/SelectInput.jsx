import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { imageUpload } from '../../../features/event/eventActions';

class ImageUpload extends Component {
  state = {
    images: []
  };

  handleChange = event => {
    let files = event.target.files;
    let images = [];
    for (let i = 0; i < files.length; i++) {
      images.push(files[i]);
    }
    this.setState(
      {
        images
      },
      () => {
        this.props.imageUpload(this.state.images);
      }
    );
  };

  render() {
    return (
      <div>
        <input multiple type='file' onChange={this.handleChange} />
      </div>
    );
  }
}

// const mapState = state => {
//   return {
//     userUid: state.firebase.auth.uid
//   };
// };

const mapDispatchToProps = {
  imageUpload
};

export default connect(
  null,
  mapDispatchToProps
)(ImageUpload);
