// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Externals
import { updateBoardImageURLAction, updateBoardAction } from 'containers/Boards/actions';
import { updateModalIDAction } from 'containers/Modal/actions';
// Relative
import { Wrapper, StyledCropper, StyledActions, CancelButton, SaveButton } from './styles';

class CropBoardImage extends Component {
  static propTypes = {
    // From mapStateToProps.
    boardImageURL: PropTypes.string.isRequired,
    selectedBoardID: PropTypes.string.isRequired,
    // From mapDispatchToProps.
    updateBoard: PropTypes.func.isRequired,
    updateModalID: PropTypes.func.isRequired,
    updateBoardImageURL: PropTypes.func.isRequired,
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
    this.props.updateBoardImageURL();
    this.props.updateModalID();
  };

  onSave = () => {
    const { croppedImageURL } = this.state;
    const { updateBoard, selectedBoardID } = this.props;

    // Escape early if there is no cropped image URL.
    if (!croppedImageURL) {
      return;
    }

    // Attempt to update the account.
    updateBoard({ id: selectedBoardID, imageURL: croppedImageURL }, { showSuccess: true });

    // Close the modal.
    this.onClose();
  };

  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  render() {
    const { onCropChange, onCropComplete, onClose, onImageLoaded, onSave } = this;
    const { boardImageURL } = this.props;
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
          src={boardImageURL}
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
  boardImageURL: state.boardsReducer.boardImageURL,
  selectedBoardID: state.boardsReducer.selectedBoardID,
});

const mapDispatchToProps = (dispatch) => ({
  updateBoard: (account, options) => dispatch(updateBoardAction(account, options)),
  updateModalID: (id) => dispatch(updateModalIDAction(id)),
  updateBoardImageURL: (imageURL) => dispatch(updateBoardImageURLAction(imageURL)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CropBoardImage);
