// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import filter from 'lodash/filter';
import get from 'lodash/get';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import size from 'lodash/size';
// Externals
import { NODE_NOTES, NODE_RECOMMENDATIONS } from 'containers/Dashboard/ITEMS';
import { NODE_UPDATE } from 'containers/BottomBar/ITEMS';
import { deriveNodeSecondaryColor, deriveNodeFontSize, deriveNodeIcon } from 'utils/helpers/nodes';
import { selectBottomBarItemAction } from 'containers/BottomBar/actions';
import { selectItemAction } from 'containers/Dashboard/actions';
import { selectMotivationAction } from 'containers/Motivations/actions';
import { selectNodeAction, updatePreviousSelectedNodeIDAction } from 'containers/Nodes/actions';
// Relative
import { NodeIndicators, NotesCounter, RecommendationsCounter, ResolvedIcon, Title, Wrapper } from './styles';

class Node extends Component {
  static propTypes = {
    nodeID: PropTypes.string.isRequired,
    // From mapStateToProps.
    nodesLookup: PropTypes.object.isRequired,
    recommendationsLookup: PropTypes.object.isRequired,
    selectedMotivationID: PropTypes.string,
    selectedNodeID: PropTypes.string,
    // From mapDispatchToProps.
    selectBottomBarItem: PropTypes.func.isRequired,
    selectItem: PropTypes.func.isRequired,
    selectMotivation: PropTypes.func.isRequired,
    selectNode: PropTypes.func.isRequired,
    updatePreviousSelectedNodeID: PropTypes.func.isRequired,
  };

  componentWillUnmount() {
    clearTimeout(this.updateTimeout);
  }

  isSelecedAncestor = () => {
    const { nodeID, nodesLookup, selectedNodeID } = this.props;
    const parentIDs = [];

    // Derive the selected node's parentID.
    const selectedNode = get(nodesLookup, `[${selectedNodeID}]`);
    let parentID = get(selectedNode, 'parentID');

    while (parentID) {
      // Add the parentID.
      parentIDs.push(parentID);

      // Derive the next parentID.
      const parent = get(nodesLookup, `[${parentID}]`);
      parentID = get(parent, 'parentID');
    }

    // See if any of the parents of the selected node are this current node.
    return includes(parentIDs, nodeID);
  };

  isSelectedChild = () => {
    const { nodeID, nodesLookup, selectedNodeID } = this.props;

    // Derive if the node is an immediate child of the selected node.
    const selectedNode = get(nodesLookup, `[${selectedNodeID}]`);
    const selectedNodeChildrenIDs = get(selectedNode, 'childrenIDs');
    const isSelectedChild = includes(selectedNodeChildrenIDs, nodeID);

    return isSelectedChild;
  };

  onNodeClick = () => {
    const {
      nodeID,
      selectBottomBarItem,
      selectNode,
      selectedNodeID,
      selectMotivation,
      updatePreviousSelectedNodeID,
    } = this.props;

    // Unselect the motivation.
    selectMotivation();

    // Escape early if it is already selected.
    if (nodeID === selectedNodeID) {
      // Select the bottom bar.
      selectBottomBarItem(NODE_UPDATE);
      return;
    }

    // Make our current selected node the previous selected node ID.
    updatePreviousSelectedNodeID(selectedNodeID);

    // Select the node.
    selectNode(nodeID);
  };

  onNotesClick = () => {
    this.props.selectItem(NODE_NOTES);
  };

  onRecommendationsClick = () => {
    this.props.selectItem(NODE_RECOMMENDATIONS);
  };

  render() {
    const { isSelecedAncestor, isSelectedChild, onNotesClick, onNodeClick, onRecommendationsClick } = this;
    const { recommendationsLookup, nodeID, nodesLookup, selectedNodeID, selectedMotivationID } = this.props;

    // Derive the node properties.
    const node = get(nodesLookup, `[${nodeID}]`);
    const nodeType = get(node, 'nodeType');
    const noteIDs = get(node, 'noteIDs');
    const resolved = get(node, 'resolved');
    const title = get(node, 'title');

    // Derive if the node is the selected node.
    const isSelected = nodeID === selectedNodeID && !selectedMotivationID;

    // Derive if the node should be highlighted.
    const isHighlighted = nodeID === selectedNodeID || isSelectedChild() || isSelecedAncestor();

    // Derive the node icon.
    const Icon = deriveNodeIcon(nodeType);

    // Derive amount of recommendationIDs.
    const recommendationIDs = filter(
      recommendationsLookup,
      (recommendation) => get(recommendation, 'parentNodeID') === nodeID,
    );

    return (
      <Wrapper
        onClick={onNodeClick}
        style={{
          background: deriveNodeSecondaryColor(nodeType),
          border: isSelected
            ? `3px solid ${deriveNodeSecondaryColor(nodeType, { colorType: 'normal' })}`
            : '3px solid transparent',
          boxShadow: isSelected ? 'rgba(0, 0, 0, 0.4) 0px 4px 10px 0px' : 'none',
          opacity: isHighlighted ? '1' : '0.4',
        }}
      >
        {/* Node Indicators */}
        <NodeIndicators>
          {/* Resolved Toggle */}
          {resolved && <ResolvedIcon />}

          {/* NodeNotes Toggle */}
          {!isEmpty(noteIDs) && <NotesCounter onClick={onNotesClick}>{size(noteIDs)}</NotesCounter>}

          {/* Recommendations Toggle */}
          {!isEmpty(recommendationIDs) && (
            <RecommendationsCounter onClick={onRecommendationsClick}>{size(recommendationIDs)}</RecommendationsCounter>
          )}
        </NodeIndicators>

        {/* Drag Handle */}
        {Icon && <Icon />}

        {/* Node Title */}
        <Title style={{ fontSize: deriveNodeFontSize(title) }}>{title}</Title>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  nodesLookup: state.nodesReducer.nodesLookup,
  recommendationsLookup: state.recommendationsReducer.recommendationsLookup,
  selectedMotivationID: state.motivationsReducer.selectedMotivationID,
  selectedNodeID: state.nodesReducer.selectedNodeID,
});

const mapDispatchToProps = (dispatch) => ({
  selectBottomBarItem: (item) => dispatch(selectBottomBarItemAction(item)),
  selectItem: (id) => dispatch(selectItemAction(id)),
  selectMotivation: (id) => dispatch(selectMotivationAction(id)),
  selectNode: (id) => dispatch(selectNodeAction(id)),
  updatePreviousSelectedNodeID: (id) => dispatch(updatePreviousSelectedNodeIDAction(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Node);
