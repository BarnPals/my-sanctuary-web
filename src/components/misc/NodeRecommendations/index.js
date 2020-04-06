// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import filter from 'lodash/filter';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import trim from 'lodash/trim';
// Externals
import theme from 'assets/theme';
import { NODE_ROWS } from 'containers/Dashboard/ITEMS';
import { PENDING } from 'containers/Recommendations/STATUSES';
import { deriveNodePrimaryColor } from 'utils/helpers/nodes';
import { deriveTimestamp } from 'utils/helpers/time';
import { selectItemAction } from 'containers/Dashboard/actions';
import { updateRecommendationAction } from 'containers/Recommendations/actions';
// Relative
import {
  Center,
  CreateBar,
  Header,
  Left,
  NoRecommendations,
  NoRecommendationsIcon,
  Recommendation,
  RecommendationStatus,
  RecommendationTimestamp,
  Recommendations,
  Right,
  StyledBackButton,
  StyledButton,
  StyledField,
  Subtitle,
  Title,
  Wrapper,
} from './styles';

class NodeRecommendations extends Component {
  static propTypes = {
    // From mapStateToProps.
    nodesLookup: PropTypes.object.isRequired,
    recommendationsLookup: PropTypes.object.isRequired,
    selectedNodeID: PropTypes.string.isRequired,
    updating: PropTypes.bool.isRequired,
    // From mapDispatchToProps.
    selectItem: PropTypes.func.isRequired,
    updateRecommendation: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      newTitle: '',
      selectedRecommendationID: undefined,
    };
  }

  onBack = () => {
    this.props.selectItem(NODE_ROWS);
  };

  onRecommendationSelect = (selectedRecommendationID) => () => {
    this.setState({ selectedRecommendationID });
  };

  onUpdateRecommendationEnter = (event) => {
    if (event.keyCode === 13) {
      this.onUpdateRecommendation();
    }
  };

  onUpdateRecommendationChange = (event) => {
    // Ensure there's no title when there's no selected recommendation.
    if (!this.state.selectedRecommendationID) {
      event.preventDefault();
      this.setState({ newTitle: '' });
      return;
    }

    // Update our new title.
    this.setState({ newTitle: event.target.value });
  };

  isRecommendationValid = () => {
    const { newTitle } = this.state;
    const { updating } = this.props;

    // Escape early if we are already updating.
    if (updating) {
      return false;
    }

    // Escape early if we are missing properties.
    if (!newTitle) {
      return false;
    }

    return true;
  };

  onUpdateRecommendation = () => {
    const { isRecommendationValid } = this;
    const { updateRecommendation } = this.props;
    const { newTitle, selectedRecommendationID } = this.state;

    // Escape early if the new recommendation is not valid.
    if (!isRecommendationValid()) {
      return;
    }

    // Create the recommendation.
    updateRecommendation({ id: selectedRecommendationID, status: PENDING, title: trim(newTitle) });

    // Reset state.
    this.setState({ newTitle: '', selectedRecommendationID: undefined });
  };

  render() {
    const {
      isRecommendationValid,
      onBack,
      onRecommendationSelect,
      onUpdateRecommendation,
      onUpdateRecommendationChange,
      onUpdateRecommendationEnter,
    } = this;
    const { nodesLookup, recommendationsLookup, selectedNodeID } = this.props;
    const { newTitle, selectedRecommendationID } = this.state;

    // Derive node properties.
    const node = get(nodesLookup, `[${selectedNodeID}]`);
    const nodeType = get(node, 'nodeType');
    const title = get(node, 'title');

    // Derive recommendations.
    const recommendations = orderBy(
      filter(recommendationsLookup, (recommendation) => get(recommendation, 'parentNodeID') === selectedNodeID),
      'updatedAt',
      'asc',
    );

    return (
      <Wrapper>
        <Header>
          <Left>
            <StyledBackButton onClick={onBack} />
          </Left>
          <Center>
            <Title>Recommendations</Title>
            <Subtitle style={{ color: deriveNodePrimaryColor(nodeType) }}>{title}</Subtitle>
          </Center>
          <Right />
        </Header>

        {/* No Recommendations Icon */}
        {isEmpty(recommendations) && (
          <NoRecommendations>
            <NoRecommendationsIcon />
          </NoRecommendations>
        )}

        {/* List of Recommendations */}
        {!isEmpty(recommendations) && (
          <Recommendations>
            {/* Recommendations */}
            {map(recommendations, (recommendation) => {
              // Derive recommendation properties.
              const id = get(recommendation, 'id');
              const status = get(recommendation, 'status');
              const createdAtMS = get(recommendation, 'createdAt.seconds') * 1000;
              const updatedAtMS = get(recommendation, 'updatedAt.seconds') * 1000;

              return (
                <Recommendation
                  key={id}
                  onClick={onRecommendationSelect(id)}
                  style={{ background: selectedRecommendationID === id ? theme.main.colors.blue.tint : undefined }}
                >
                  <RecommendationStatus>
                    STATUS: <strong>{status}</strong>
                  </RecommendationStatus>
                  <RecommendationTimestamp>{deriveTimestamp(createdAtMS, updatedAtMS)}</RecommendationTimestamp>
                </Recommendation>
              );
            })}
          </Recommendations>
        )}

        {/* Create Recommendation */}
        <CreateBar>
          <StyledField
            autoFocus
            id="recommendaton-field"
            onChange={onUpdateRecommendationChange}
            onKeyDown={onUpdateRecommendationEnter}
            placeholder={selectedRecommendationID ? 'Write a recommendation...' : 'Select a recommendation first...'}
            value={newTitle}
          />
          <StyledButton disabled={!isRecommendationValid()} onClick={onUpdateRecommendation} />
        </CreateBar>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  nodesLookup: state.nodesReducer.nodesLookup,
  recommendationsLookup: state.recommendationsReducer.recommendationsLookup,
  selectedNodeID: state.nodesReducer.selectedNodeID,
  updating: state.recommendationsReducer.updating,
});

const mapDispatchToProps = (dispatch) => ({
  selectItem: (item) => dispatch(selectItemAction(item)),
  updateRecommendation: (recommendation) => dispatch(updateRecommendationAction(recommendation)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NodeRecommendations);
