// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
// Externals
import { deriveNodeFontSize } from 'utils/helpers/nodes';
import { selectMotivationAction } from 'containers/Motivations/actions';
import { updateModalIDAction } from 'containers/Modal/actions';
import theme from 'assets/theme';
// Relative
import { Icon, Title, Wrapper } from './styles';

class Motivation extends Component {
  static propTypes = {
    motivationID: PropTypes.string.isRequired,
    // From mapStateToProps.
    motivationsLookup: PropTypes.object.isRequired,
    selectedMotivationID: PropTypes.string,
    // From mapDispatchToProps.
    selectMotivation: PropTypes.func.isRequired,
  };

  onMotivationClick = () => {
    const { motivationID, selectMotivation } = this.props;

    // Select the motivation.
    selectMotivation(motivationID);
  };

  render() {
    const { onMotivationClick } = this;
    const { motivationID, motivationsLookup, selectedMotivationID } = this.props;

    // Derive the motivation properties.
    const motivation = get(motivationsLookup, `[${motivationID}]`);
    const title = get(motivation, 'title');

    // Derive if the motivation is selected.
    const isSelected = motivationID === selectedMotivationID;

    return (
      <Wrapper
        onClick={onMotivationClick}
        style={{
          border: isSelected ? `3px solid ${theme.main.colors.blue.normal}` : '3px solid transparent',
          boxShadow: isSelected ? 'rgba(0, 0, 0, 0.4) 0px 4px 10px 0px' : 'none',
          opacity: isSelected ? '1' : '0.4',
        }}
      >
        {/* Icon */}
        <Icon />

        {/* Title */}
        <Title style={{ fontSize: deriveNodeFontSize(title) }}>{title}</Title>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  motivationsLookup: state.motivationsReducer.motivationsLookup,
  selectedMotivationID: state.motivationsReducer.selectedMotivationID,
});

const mapDispatchToProps = (dispatch) => ({
  selectMotivation: (id) => dispatch(selectMotivationAction(id)),
  updateModalID: (id) => dispatch(updateModalIDAction(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Motivation);
