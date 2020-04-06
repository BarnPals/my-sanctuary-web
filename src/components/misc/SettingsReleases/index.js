// Depenencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Externals
import { selectItemAction } from 'containers/Dashboard/actions';
// Relative
import {
  StyledComingSoonIcon,
  StyledComingSoon,
  Wrapper,
  Header,
  StyledBackButton,
  Left,
  Center,
  Right,
} from './styles';

class SettingsReleases extends Component {
  static propTypes = {
    // From mapDispatchToProps.
    selectItem: PropTypes.func.isRequired,
  };

  onBack = () => {
    this.props.selectItem();
  };

  render() {
    const { onBack } = this;

    return (
      <Wrapper>
        <Header>
          <Left>
            <StyledBackButton onClick={onBack} />
          </Left>
          <Center>Latest Release Notes</Center>
          <Right />
        </Header>

        <StyledComingSoon>
          <StyledComingSoonIcon />
          Coming Soon
        </StyledComingSoon>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  selectItem: (item) => dispatch(selectItemAction(item)),
});

export default connect(
  null,
  mapDispatchToProps,
)(SettingsReleases);
