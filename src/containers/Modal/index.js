// Dependencies
import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
// Externals
import { NODE_NOTES } from 'containers/Nodes/NODE_ITEMS';
import { selectNodeItemAction } from 'containers/Nodes/actions';
// Relative
import { MODALS_LOOKUP } from './MODALS';
import { updateModalIDAction } from './actions';
import { Background, Wrapper } from './styles';

class Modal extends Component {
  static propTypes = {
    // From mapStateToProps.
    id: PropTypes.string,
    // From mapDispatchToProps.
    selectNodeItem: PropTypes.func.isRequired,
    updateModalID: PropTypes.func.isRequired,
  };

  componentWillUnmount() {
    // Remove ESC listener.
    document.removeEventListener('keydown', this.onKeyDown);
  }

  componentDidUpdate(prevProps) {
    // Listen for ESC when modal is up.
    if (prevProps.id !== this.props.id && this.props.id) {
      document.addEventListener('keydown', this.onKeyDown);
    }

    // Stop listening for ESC when modal is down.
    if (this.props.id !== prevProps.id && !this.props.id) {
      document.removeEventListener('keydown', this.onKeyDown);
    }
  }

  onKeyDown = (event) => {
    // On escape, close modal.
    if (event.keyCode === 27) {
      this.close();
    }
  };

  close = () => {
    // Close the modal.
    this.props.updateModalID();

    // Reset the selected node item.
    this.props.selectNodeItem(NODE_NOTES);
  };

  render() {
    const { close } = this;
    const { id } = this.props;

    // Derive the modal.
    const modal = get(MODALS_LOOKUP, `[${id}]`);

    // Escape early and do not render when no modal is found.
    if (!modal) {
      return null;
    }

    // Derive the modal properties.
    const Content = get(modal, 'Content');

    return (
      <Wrapper>
        <Background onClick={close} />
        <Suspense fallback={<div />}>
          <Content />
        </Suspense>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.modalReducer.id,
});

const mapDispatchToProps = (dispatch) => ({
  selectNodeItem: (item) => dispatch(selectNodeItemAction(item)),
  updateModalID: (id) => dispatch(updateModalIDAction(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal);
