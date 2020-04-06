// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Externals
import { updateAccountAction, updateProfileImageURLAction } from 'containers/Account/actions';
import { updateModalIDAction } from 'containers/Modal/actions';
// Relative
import { Wrapper, StyledCropper, StyledActions, CancelButton, SaveButton } from './styles';

class CropProfileImage extends Component {
  static propTypes = {
    // From mapStateToProps.
    profileImageURL: PropTypes.string.isRequired,
    // From mapDispatchToProps.
    updateAccount: PropTypes.func.isRequired,
    updateModalID: PropTypes.func.isRequired,
    updateProfileImageURL: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      crop: {
        aspect: 1,
        height: 50,
        unit: 'px',
        width: 50,
      },
      croppedImageURL: '',
    };
  }

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop: percentCrop });
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageURL = await this.getCroppedImg(this.imageRef, crop, 'newFile.jpeg');
      this.setState({ croppedImageURL });
    }
  }

  getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        resolve(blob);
      }, 'image/jpeg');
    });
  };

  onClose = () => {
    this.props.updateProfileImageURL();
    this.props.updateModalID();
  };

  onSave = () => {
    const { croppedImageURL } = this.state;
    const { updateAccount } = this.props;

    // Escape early if there is no cropped image URL.
    if (!croppedImageURL) {
      return;
    }

    // Attempt to update the account.
    updateAccount({ imageURL: croppedImageURL }, { showSuccess: true });

    // Close the modal.
    this.onClose();
  };

  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  render() {
    const { onCropChange, onCropComplete, onClose, onImageLoaded, onSave } = this;
    const { profileImageURL } = this.props;
    const { crop } = this.state;

    return (
      <Wrapper>
        <StyledCropper
          crop={crop}
          minHeight={50}
          minWidth={50}
          onChange={onCropChange}
          onComplete={onCropComplete}
          onImageLoaded={onImageLoaded}
          src={profileImageURL}
        />

        <StyledActions>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <SaveButton onClick={onSave}>Save</SaveButton>
        </StyledActions>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  profileImageURL: state.accountsReducer.profileImageURL,
});

const mapDispatchToProps = (dispatch) => ({
  updateAccount: (account, options) => dispatch(updateAccountAction(account, options)),
  updateModalID: (id) => dispatch(updateModalIDAction(id)),
  updateProfileImageURL: (imageURL) => dispatch(updateProfileImageURLAction(imageURL)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CropProfileImage);
