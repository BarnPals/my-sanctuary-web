// Dependencies
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
// Externals
import history from 'store/history';
import theme from 'assets/theme';
// Relative
import { BoardImage, Card, CardTitle, CardTitleBlank, CloseIcon, Well, Row, Wrapper } from './styles';

const ExampleBoard = (props) => {
  const { boardImage, boardName, fears, showWelcome } = props;

  const fear1Title = get(fears, '[0].title');
  const fear2Title = get(fears, '[1].title');
  const fear3Title = get(fears, '[2].title');

  return (
    <Wrapper>
      {/* Close Icon */}
      {!showWelcome && <CloseIcon onClick={() => history.goBack()} />}

      <Well>
        {/* Board Image */}
        <BoardImage src={boardImage} />

        <Row>
          {/* IDEA */}
          <Card color={boardName ? theme.main.colors.blue.tint : theme.main.colors.white}>
            {boardName ? (
              <CardTitle>{boardName}</CardTitle>
            ) : (
              <Fragment>
                <CardTitleBlank />
                <CardTitleBlank />
              </Fragment>
            )}
          </Card>
        </Row>

        <Row>
          {/* FEAR 1 */}
          <Card color={fear1Title ? theme.main.colors.red.tint : theme.main.colors.white}>
            {fear1Title ? (
              <CardTitle>{fear1Title}</CardTitle>
            ) : (
              <Fragment>
                <CardTitleBlank />
                <CardTitleBlank />
                <CardTitleBlank />
              </Fragment>
            )}
          </Card>

          {/* FEAR 2 */}
          <Card color={fear2Title ? theme.main.colors.red.tint : theme.main.colors.white}>
            {fear2Title ? <CardTitle>{fear2Title}</CardTitle> : <CardTitleBlank />}
          </Card>

          {/* FEAR 3 */}
          <Card color={fear3Title ? theme.main.colors.red.tint : theme.main.colors.white}>
            {fear3Title ? (
              <CardTitle>{fear3Title}</CardTitle>
            ) : (
              <Fragment>
                <CardTitleBlank />
                <CardTitleBlank />
              </Fragment>
            )}
          </Card>
        </Row>
      </Well>
    </Wrapper>
  );
};

ExampleBoard.propTypes = {
  boardImage: PropTypes.string,
  boardName: PropTypes.string.isRequired,
  fears: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  showWelcome: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  boardName: state.createBoardWizardReducer.boardName,
  fears: state.createBoardWizardReducer.fears,
  showWelcome: state.createBoardWizardReducer.showWelcome,
});

export default connect(
  mapStateToProps,
  null,
)(ExampleBoard);
