// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import map from 'lodash/map';
// Externals
import BottomBar from 'containers/BottomBar';
import MotivationsRow from 'components/misc/MotivationsRow';
import NodeRow from 'components/misc/NodeRow';
import NodeRowsTopBar from 'components/misc/NodeRowsTopBar';
// Relative
import { Wrapper, Rows } from './styles';

const NodeRows = ({ nodeRows }) => (
  <Wrapper>
    {/* Top Bar */}
    <NodeRowsTopBar />

    <Rows id="node-rows">
      {/* Motivations */}
      <MotivationsRow />

      {/* Node Rows */}
      {map(nodeRows, (nodeRow, index) => {
        // Derive node row properties.
        const id = get(nodeRow, 'id');

        // Derive if the row is an even.
        const isOdd = !(index % 2);

        // Render the node row.
        return <NodeRow key={id} darkenBackground={isOdd} nodeRow={nodeRow} />;
      })}
    </Rows>

    {/* Bottom Bar */}
    <BottomBar />
  </Wrapper>
);

NodeRows.propTypes = {
  nodeRows: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  nodeRows: state.nodesReducer.nodeRows,
});

export default connect(
  mapStateToProps,
  null,
)(NodeRows);
