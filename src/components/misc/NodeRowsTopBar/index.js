// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import invoke from 'lodash/invoke';
// Externals
import { CROP_BOARD_IMAGE } from 'containers/Modal/MODALS';
import { expandNavAction, selectItemAction } from 'containers/Dashboard/actions';
import { updateBoardImageURLAction } from 'containers/Boards/actions';
import { updateModalIDAction } from 'containers/Modal/actions';
// Relative
import {
  BoardImage,
  BoardImageOverlay,
  BoardImageWrapper,
  BoardName,
  CameraIcon,
  ExpandNavButton,
  Left,
  MobileBack,
  UploadImageField,
  Wrapper,
} from './styles';

class NodeRowsTopBar extends Component {
  static propTypes = {
    // From mapStateToProps.
    boardsLookup: PropTypes.object.isRequired,
    isNavCollapsed: PropTypes.bool.isRequired,
    selectedBoardID: PropTypes.string.isRequired,
    // From mapDispatchToProps.
    expandNav: PropTypes.func.isRequired,
    selectItem: PropTypes.func.isRequired,
    updateBoardImageURL: PropTypes.func.isRequired,
    updateModalID: PropTypes.func.isRequired,
  };

  onBack = () => {
    this.props.selectItem();
  };

  onExpandNav = () => {
    this.props.expandNav();
  };

  onImageClick = () => {
    // Derive the upload image element.
    const uploadElement = document.getElementById('upload-image');

    // Attempt to click the element.
    invoke(uploadElement, 'click');
  };

  onUploadImage = (event) => {
    const { files } = event.target;

    // Escape early if no file was uploaded or too many were uploaded.
    if (files.length !== 1) {
      console.warn('Files was not expected size', files);
      return;
    }

    const file = get(files, '[0]');

    // Escape early if we were not able to get the first file.
    if (!file) {
      console.warn('No file found', files);
      return;
    }

    // Read the file as a data URL.
    const reader = new FileReader();
    reader.readAsDataURL(file);

    // Attempt to upload the file.
    reader.onloadend = (event) => {
      // Derive the image URL.
      const boardImageURL = event.target.result;

      // Update it in our store.
      this.props.updateBoardImageURL(boardImageURL);

      // Open the crop modal.
      this.props.updateModalID(CROP_BOARD_IMAGE);

      // Derive the upload image element.
      const uploadElement = document.getElementById('upload-image');

      // Empty the element so that uploading again works.
      if (uploadElement) {
        uploadElement.value = null;
      }
    };
  };

  render() {
    const { onBack, onExpandNav, onImageClick, onUploadImage } = this;
    const { boardsLookup, isNavCollapsed, selectedBoardID } = this.props;

    // Derive board properties.
    const board = get(boardsLookup, `[${selectedBoardID}]`);
    const name = get(board, 'name');
    const imageURL = get(board, 'imageURL');

    return (
      <Wrapper>
        <Left>
          {/* Back Button (mobile) */}
          <MobileBack onClick={onBack} />

          {/* Expand Side Nav Button */}
          <ExpandNavButton hidden={!isNavCollapsed} onClick={onExpandNav} />

          {/* Board Image */}
          <BoardImageWrapper onClick={onImageClick}>
            <BoardImageOverlay />
            <BoardImage alt="board image" src={imageURL} />
            <CameraIcon />

            {/* Upload Image Field */}
            <UploadImageField id="upload-image" onChange={onUploadImage} type="file" />
          </BoardImageWrapper>

          <BoardName>{name}</BoardName>
        </Left>

        {/* <Right /> */}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  boardsLookup: state.boardsReducer.boardsLookup,
  isNavCollapsed: state.dashboardReducer.isNavCollapsed,
  selectedBoardID: state.boardsReducer.selectedBoardID,
});

const mapDispatchToProps = (dispatch) => ({
  expandNav: () => dispatch(expandNavAction()),
  selectItem: (item) => dispatch(selectItemAction(item)),
  updateBoardImageURL: (imageURL) => dispatch(updateBoardImageURLAction(imageURL)),
  updateModalID: (id) => dispatch(updateModalIDAction(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NodeRowsTopBar);
