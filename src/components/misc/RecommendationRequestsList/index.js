// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import filter from 'lodash/filter';
import get from 'lodash/get';
import map from 'lodash/map';
// Externals
import RecommendationRequest from 'components/misc/RecommendationRequest';
import { collapseNavAction } from 'containers/Dashboard/actions';
import { REVIEW } from 'containers/Recommendations/STATUSES';
// Relative
import { CollapseIcon, List, Header, Title, AddItem, Wrapper } from './styles';

class RecommendationRequestsList extends Component {
  static propTypes = {
    // From mapStateToProps.
    recommendationIDs: PropTypes.arrayOf(PropTypes.string.isRequired),
    recommendationsLookup: PropTypes.object.isRequired,
    selectedItem: PropTypes.string,
    // From mapDispatchToProps.
    collapseNav: PropTypes.func.isRequired,
  };

  onAddRecommendationRequest = () => {
    // Do nothing at the moment.
  };

  onCollapse = () => {
    this.props.collapseNav();
  };

  render() {
    const { onAddRecommendationRequest, onCollapse } = this;
    const { recommendationIDs, recommendationsLookup, selectedItem } = this.props;

    // Derive only recommendations that are REVIEW.
    const recommendationRequestIDs = filter(
      recommendationIDs,
      (id) => get(recommendationsLookup, `[${id}].status`) === REVIEW,
    );

    return (
      <Wrapper>
        <Header>
          <CollapseIcon hidden={!selectedItem} onClick={onCollapse} />

          {/* RecommendationRequests List Title */}
          <Title>Recommendation Requests</Title>

          {/* Add RecommendationRequest */}
          <AddItem onClick={onAddRecommendationRequest} />
        </Header>

        {/* List RecommendationRequests */}
        <List>
          {map(recommendationRequestIDs, (id) => (
            <RecommendationRequest key={id} recommendationID={id} />
          ))}
        </List>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  recommendationIDs: state.recommendationsReducer.recommendationIDs,
  recommendationsLookup: state.recommendationsReducer.recommendationsLookup,
  selectedItem: state.dashboardReducer.selectedItem,
});

const mapDispatchToProps = (dispatch) => ({
  collapseNav: () => dispatch(collapseNavAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecommendationRequestsList);
