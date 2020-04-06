// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import map from 'lodash/map';
// Externals
import { SETTINGS_PROFILE } from 'containers/Dashboard/ITEMS';
import { selectItemAction } from 'containers/Dashboard/actions';
// Relative
import SETTINGS_ITEMS from './SETTINGS_ITEMS';
import {
  DisplayName,
  Email,
  Header,
  Item,
  ItemTitle,
  List,
  Profile,
  ProfileDetails,
  ProfileImage,
  StyledArrow,
  Title,
  Wrapper,
} from './styles';

class SettingsList extends Component {
  static propTypes = {
    // From mapStateToProps.
    account: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
    }),
    selectedItem: PropTypes.string,
    // From mapDispatchToProps.
    selectItem: PropTypes.func.isRequired,
  };

  onSettingsSelect = (item) => () => {
    const { selectedItem, selectItem } = this.props;

    // If the item is not already selected, select it.
    if (item !== selectedItem) {
      selectItem(item);
    }
  };

  render() {
    const { onSettingsSelect } = this;
    const { account, selectedItem } = this.props;

    // Derive account properties.
    const displayName = get(account, 'displayName');
    const email = get(account, 'email');
    const imageURL = get(account, 'imageURL');

    return (
      <Wrapper>
        <Header>
          <div style={{ width: '20px' }} />

          {/* Settings List Title */}
          <Title>Settings</Title>

          <div style={{ width: '20px' }} />
        </Header>

        {/* List Settings */}
        <List>
          {/* Profile Settings */}
          <Profile onClick={onSettingsSelect(SETTINGS_PROFILE)} selected={selectedItem === SETTINGS_PROFILE}>
            <ProfileImage alt={displayName} src={imageURL} />
            <ProfileDetails>
              <DisplayName>{displayName}</DisplayName>
              <Email>{email}</Email>
            </ProfileDetails>
            <StyledArrow />
          </Profile>

          {map(SETTINGS_ITEMS, ({ ItemIcon, title, id }) => (
            <Item key={id} onClick={onSettingsSelect(id)} selected={selectedItem === id}>
              <ItemIcon />
              <ItemTitle>{title}</ItemTitle>
              <StyledArrow />
            </Item>
          ))}
        </List>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  account: state.accountsReducer.account,
  selectedItem: state.dashboardReducer.selectedItem,
});

const mapDispatchToProps = (dispatch) => ({
  selectItem: (item) => dispatch(selectItemAction(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsList);
