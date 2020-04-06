// Depenencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import invoke from 'lodash/invoke';
// Externals
import { CROP_PROFILE_IMAGE } from 'containers/Modal/MODALS';
import { logoutAction, sendPasswordResetEmailAction } from 'containers/Auth/actions';
import { selectItemAction } from 'containers/Dashboard/actions';
import { updateAccountAction, updateProfileImageURLAction } from 'containers/Account/actions';
import { updateModalIDAction } from 'containers/Modal/actions';
import theme from 'assets/theme';
// Relative
import {
  CameraIcon,
  Center,
  DisplayNameField,
  Header,
  Left,
  ProfileGroup,
  ProfileImage,
  ProfileImageOverlay,
  ProfileImageWrapper,
  Right,
  StyledBackButton,
  StyledButton,
  StyledLink,
  UploadImageField,
  Wrapper,
} from './styles';

class SettingsProfile extends Component {
  static propTypes = {
    // From mapStateToProps.
    account: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
    }),
    updating: PropTypes.bool.isRequired,
    // From mapDispatchToProps.
    logout: PropTypes.func.isRequired,
    selectItem: PropTypes.func.isRequired,
    sendPasswordResetEmail: PropTypes.func.isRequired,
    updateAccount: PropTypes.func.isRequired,
    updateModalID: PropTypes.func.isRequired,
    updateProfileImageURL: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      displayName: get(props, 'account.displayName', ''),
    };
  }

  componentDidMount() {
    // Scroll to top of page.
    window.scroll(0, 0);
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.account !== nextProps.account) {
      this.setState({
        displayName: get(nextProps, 'account.displayName', ''),
      });
    }
  }

  onBack = () => {
    this.props.selectItem();
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
      const profileImageURL = event.target.result;

      // Update it in our store.
      this.props.updateProfileImageURL(profileImageURL);

      // Open the crop modal.
      this.props.updateModalID(CROP_PROFILE_IMAGE);

      // Derive the upload image element.
      const uploadElement = document.getElementById('upload-image');

      // Empty the element so that uploading again works.
      if (uploadElement) {
        uploadElement.value = null;
      }
    };
  };

  onDisplayNameEnter = (event) => {
    if (event.keyCode === 13) {
      this.onUpdateAccount();
    }
  };

  isValid = () => {
    const { displayName } = this.state;
    const { account, updating } = this.props;

    // Escape early if we are already updating.
    if (updating) {
      return false;
    }

    // Escape early if there is no displayName to save.
    if (!displayName) {
      return false;
    }

    // Escape early if the displayName has not changed.
    if (displayName === get(account, 'displayName')) {
      return false;
    }

    return true;
  };

  onStateChange = (key) => (event) => {
    this.setState({ [key]: event.target.value });
  };

  onUpdateAccount = () => {
    const { displayName } = this.state;

    // Escape early if form is not valid.
    if (!this.isValid()) {
      return;
    }

    // Update the account.
    this.props.updateAccount({ displayName }, { showSuccess: true });
  };

  onResetPasswordClick = () => {
    this.props.sendPasswordResetEmail();
  };

  onLogoutClick = () => {
    this.props.logout();
  };

  render() {
    const {
      isValid,
      onBack,
      onDisplayNameEnter,
      onImageClick,
      onLogoutClick,
      onResetPasswordClick,
      onStateChange,
      onUpdateAccount,
      onUploadImage,
    } = this;
    const { account } = this.props;
    const { displayName } = this.state;

    // Derive account properties.
    const imageURL = get(account, 'imageURL');

    return (
      <Wrapper>
        {/* Header */}
        <Header>
          <Left>
            <StyledBackButton onClick={onBack} />
          </Left>
          <Center>Profile Settings</Center>
          <Right />
        </Header>

        <ProfileGroup>
          {/* Profile Image */}
          <ProfileImageWrapper onClick={onImageClick}>
            <ProfileImageOverlay />
            <ProfileImage alt="profile image" src={imageURL} />
            <CameraIcon />

            {/* Upload Image Field */}
            <UploadImageField id="upload-image" onChange={onUploadImage} type="file" />
          </ProfileImageWrapper>

          {/* Display Name */}
          <DisplayNameField
            onChange={onStateChange('displayName')}
            onKeyDown={onDisplayNameEnter}
            placeholder="Display Name"
            type="text"
            value={displayName}
          />

          {/* Save */}
          <StyledButton disabled={!isValid()} onClick={onUpdateAccount}>
            Save
          </StyledButton>
        </ProfileGroup>

        {/* Reset Password */}
        <StyledLink color={theme.main.colors.blue.normal} onClick={onResetPasswordClick}>
          Reset Password
        </StyledLink>

        {/* Logout */}
        <StyledLink color={theme.main.colors.red.normal} onClick={onLogoutClick}>
          Log Out
        </StyledLink>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  account: state.accountsReducer.account,
  updating: state.accountsReducer.updating,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutAction()),
  selectItem: (item) => dispatch(selectItemAction(item)),
  sendPasswordResetEmail: () => dispatch(sendPasswordResetEmailAction()),
  updateAccount: (account, options) => dispatch(updateAccountAction(account, options)),
  updateProfileImageURL: (profileImageURL) => dispatch(updateProfileImageURLAction(profileImageURL)),
  updateModalID: (id) => dispatch(updateModalIDAction(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsProfile);
