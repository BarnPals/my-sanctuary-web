// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import filter from 'lodash/filter';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import trim from 'lodash/trim';
// Externals
import { NODE_ROWS } from 'containers/Dashboard/ITEMS';
import { UPDATE_DELAY } from 'utils/config';
import { createNoteAction, updateNoteAction, updateNoteInLookupAction } from 'containers/Notes/actions';
import { deriveNodePrimaryColor } from 'utils/helpers/nodes';
import { deriveTimestamp } from 'utils/helpers/time';
import { selectItemAction } from 'containers/Dashboard/actions';
import { updateNodeAction } from 'containers/Nodes/actions';
// Relative
import {
  Center,
  CreateBar,
  StyledField,
  Header,
  Left,
  NoNotes,
  NoNotesIcon,
  Note,
  NoteDeleteButton,
  NoteField,
  NoteTimestamp,
  Right,
  StyledBackButton,
  StyledButton,
  StyledNotes,
  Subtitle,
  Title,
  Wrapper,
  flash,
} from './styles';

class NodeNotes extends Component {
  static propTypes = {
    // From mapStateToProps.
    creatingNote: PropTypes.bool.isRequired,
    nodesLookup: PropTypes.object.isRequired,
    notesLookup: PropTypes.object.isRequired,
    selectedNodeID: PropTypes.string.isRequired,
    updatingNote: PropTypes.bool.isRequired,
    updatingNode: PropTypes.bool.isRequired,
    // From mapDispatchToProps.
    createNote: PropTypes.func.isRequired,
    selectItem: PropTypes.func.isRequired,
    updateNode: PropTypes.func.isRequired,
    updateNote: PropTypes.func.isRequired,
    updateNoteInLookup: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      newTitle: '',
      updatedNoteID: undefined,
    };
  }

  componentWillUnmount() {
    // Remove update timeout and send the update request to our backend.
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
      this.onUpdateNote();
    }

    // Remove updated node timeout.
    clearTimeout(this.updatedNoteIDTimeout);
  }

  onCreateNoteChange = (event) => {
    this.setState({ newTitle: event.target.value });
  };

  onCreateNote = () => {
    const { isNewNoteValid } = this;
    const { createNote, nodesLookup, selectedNodeID } = this.props;
    const { newTitle } = this.state;

    // Escape early if the new note is not valid.
    if (!isNewNoteValid()) {
      return;
    }

    // Derive node properties.
    const node = get(nodesLookup, `[${selectedNodeID}]`);
    const boardID = get(node, 'boardID');

    // Create the note.
    createNote({ boardID, nodeID: selectedNodeID, title: trim(newTitle) });

    // Reset state.
    this.setState({ newTitle: '' });
  };

  isNewNoteValid = () => {
    const { newTitle } = this.state;
    const { creatingNote } = this.props;

    // Escape early if we are already creating a note.
    if (creatingNote) {
      return false;
    }

    // Escape early if there is no note to create.
    if (!newTitle) {
      return false;
    }

    return true;
  };

  onNoteChange = (id) => (event) => {
    // Optimistically update the note in our local lookup table.
    this.props.updateNoteInLookup({ id, title: event.target.value });

    // Update timeout.
    clearTimeout(this.updateTimeout);
    this.updateTimeout = setTimeout(() => this.onUpdateNote(id), UPDATE_DELAY);
  };

  onUpdateNote = (id) => {
    const { notesLookup, updateNote } = this.props;

    // Escape early if the form is not valid.
    if (!this.isUpdateNoteValid(id)) {
      return;
    }

    // Derive the note properties.
    const note = get(notesLookup, `[${id}]`);
    const title = get(note, 'title', '');

    // Attempt to update the note.
    updateNote({ id, title });

    // Flash updated note.
    this.showUpdatedNoteFlash(id);
  };

  isUpdateNoteValid = (id) => {
    const { notesLookup, updatingNote } = this.props;

    // Escape early if we are in the process of updating the note.
    if (updatingNote) {
      return false;
    }

    // Derive the note properties.
    const note = get(notesLookup, `[${id}]`);
    const title = get(note, 'title');

    // Escape early if there is no title.
    if (!title) {
      return false;
    }

    return true;
  };

  onNoteDelete = (id) => () => {
    const { nodesLookup, selectedNodeID, updatingNote, updatingNode } = this.props;

    // Escape early if the note is being deleted or updated.
    if (updatingNote || updatingNode) {
      return;
    }

    // Derive the selected node properties.
    const node = get(nodesLookup, `[${selectedNodeID}]`);
    const noteIDs = get(node, 'noteIDs');

    // Update the noteIDs to not include the id we're deleting.
    const updatedNoteIDs = filter(noteIDs, (noteID) => noteID !== id);

    // Delete the note.
    this.props.updateNode({ id: selectedNodeID, noteIDs: updatedNoteIDs });
    this.props.updateNote({ id, deleted: true });
  };

  showUpdatedNoteFlash = (id) => {
    this.setState({ updatedNoteID: id });

    // Reset the updatedNoteID as soon as possible.
    clearTimeout(this.updatedNoteIDTimeout);
    this.updatedNoteIDTimeout = setTimeout(() => this.setState({ updatedNoteID: undefined }), UPDATE_DELAY);
  };

  onBack = () => {
    this.props.selectItem(NODE_ROWS);
  };

  onCreateNoteEnter = (event) => {
    if (event.keyCode === 13) {
      this.onCreateNote();
    }
  };

  render() {
    const {
      isNewNoteValid,
      onBack,
      onCreateNote,
      onCreateNoteChange,
      onCreateNoteEnter,
      onNoteChange,
      onNoteDelete,
    } = this;
    const { nodesLookup, notesLookup, selectedNodeID } = this.props;
    const { newTitle, updatedNoteID } = this.state;

    // Derive node properties.
    const node = get(nodesLookup, `[${selectedNodeID}]`);
    const nodeType = get(node, 'nodeType');
    const noteIDs = get(node, 'noteIDs');
    const title = get(node, 'title');

    return (
      <Wrapper>
        <Header>
          <Left>
            <StyledBackButton onClick={onBack} />
          </Left>
          <Center>
            <Title>Notes</Title>
            <Subtitle style={{ color: deriveNodePrimaryColor(nodeType) }}>{title}</Subtitle>
          </Center>
          <Right />
        </Header>

        {/* No Notes Icon */}
        {isEmpty(noteIDs) && (
          <NoNotes>
            <NoNotesIcon />
          </NoNotes>
        )}

        {/* List of Notes */}
        {!isEmpty(noteIDs) && (
          <StyledNotes>
            {/* Notes */}
            {map(noteIDs, (id) => {
              // Derive note properties.
              const note = get(notesLookup, `[${id}]`);
              const title = get(note, 'title');
              const createdAtMS = get(note, 'createdAt.seconds') * 1000;
              const updatedAtMS = get(note, 'updatedAt.seconds') * 1000;

              return (
                <Note key={id}>
                  <NoteField onChange={onNoteChange(id)} placeholder="Write your note here..." value={title} />
                  <NoteTimestamp
                    style={{
                      animation: updatedNoteID === id ? `${flash} 1s` : 'none',
                    }}
                  >
                    {deriveTimestamp(createdAtMS, updatedAtMS)}
                  </NoteTimestamp>
                  <NoteDeleteButton onClick={onNoteDelete(id)} />
                </Note>
              );
            })}
          </StyledNotes>
        )}

        {/* Create Note */}
        <CreateBar>
          <StyledField
            autoFocus
            onChange={onCreateNoteChange}
            onKeyDown={onCreateNoteEnter}
            placeholder="Write a note..."
            value={newTitle}
          />
          <StyledButton disabled={!isNewNoteValid()} onClick={onCreateNote} />
        </CreateBar>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  creatingNote: state.notesReducer.creating,
  nodesLookup: state.nodesReducer.nodesLookup,
  notesLookup: state.notesReducer.notesLookup,
  selectedNodeID: state.nodesReducer.selectedNodeID,
  updatingNode: state.nodesReducer.updating,
  updatingNote: state.notesReducer.updating,
});

const mapDispatchToProps = (dispatch) => ({
  createNote: (note) => dispatch(createNoteAction(note)),
  selectItem: (item) => dispatch(selectItemAction(item)),
  updateNode: (node) => dispatch(updateNodeAction(node)),
  updateNote: (note) => dispatch(updateNoteAction(note)),
  updateNoteInLookup: (node) => dispatch(updateNoteInLookupAction(node)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NodeNotes);
