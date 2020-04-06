// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
// Externals
import Motivation from 'components/misc/Motivation';
import { MOTIVATION_CREATE } from 'containers/BottomBar/ITEMS';
import { selectBottomBarItemAction } from 'containers/BottomBar/actions';
// Relative
import { StyledQuestionWrapper, StyledQuestionText, StyledPlusButton, StyledNode, StyledRow, Wrapper } from './styles';

class MotivationsRow extends Component {
  static propTypes = {
    // From mapStateToProps.
    baseNodeID: PropTypes.string,
    motivationIDs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    // From mapDispatchToProps.
    selectBottomBarItem: PropTypes.func.isRequired,
  };

  onQuestionClick = () => {
    const { selectBottomBarItem } = this.props;

    // Select the motivation create bottom bar.
    selectBottomBarItem(MOTIVATION_CREATE);
  };

  render() {
    const { onQuestionClick } = this;
    const { baseNodeID, motivationIDs } = this.props;

    return (
      <Wrapper>
        {/* Create Motivation Question */}
        <StyledQuestionWrapper onClick={onQuestionClick}>
          <StyledQuestionText>What would convince your future self to work on this idea?</StyledQuestionText>
          <StyledPlusButton />
        </StyledQuestionWrapper>

        <StyledRow>
          {/* Base Node */}
          {baseNodeID && <StyledNode nodeID={baseNodeID} />}

          {/* Motivations */}
          {map(motivationIDs, (id) => (
            <Motivation key={id} motivationID={id} />
          ))}
        </StyledRow>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  baseNodeID: state.nodesReducer.baseNodeID,
  motivationIDs: state.motivationsReducer.motivationIDs,
});

const mapDispatchToProps = (dispatch) => ({
  selectBottomBarItem: (item) => dispatch(selectBottomBarItemAction(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MotivationsRow);
