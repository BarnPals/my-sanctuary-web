// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import get from 'lodash/get';
// Externals
import ExampleBoard from 'components/misc/ExampleBoard';
import theme from 'assets/theme';
// Relative
import { Content, StyledLottieAnimation, Wrapper } from './styles';
import { resetAction } from './actions';
import { stepsLookup } from './STEPS';

class CreateBoardWizard extends Component {
  static propTypes = {
    // From mapStateToProps.
    stepID: PropTypes.string.isRequired,
    // From mapDispatchToProps.
    reset: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showAnimation: true,
    };
  }

  componentDidMount() {
    // Scroll to top of page.
    window.scroll(0, 0);

    // Show animation after 3s.
    this.showAnimationTimeout = setTimeout(() => this.setState({ showAnimation: false }), 3000);
  }

  componentWillUnmount() {
    clearTimeout(this.showAnimationTimeout);

    // Reset our wizard's state.
    this.props.reset();
  }

  render() {
    const { showAnimation } = this.state;
    const { stepID } = this.props;

    // Derive the step to render.
    const Step = get(stepsLookup, `[${stepID}]`);

    return (
      <Wrapper>
        {/* SEO */}
        <Helmet defaultTitle="Barn Pals" titleTemplate="Barn Pals | %s">
          <title>Welcome!</title>
          <meta
            name="description"
            content="For entrepreneurs, thinkers, and product managers, Barn Pals's product management software helps you achieve your goals."
          />
        </Helmet>

        {/* Beginning animation */}
        {showAnimation && (
          <StyledLottieAnimation
            isClickToPauseDisabled
            options={{ autoplay: true, animationData: theme.main.lottieAnimations.confetti, loop: false }}
          />
        )}

        {/* The example board */}
        <ExampleBoard />

        {/* The wizard step we're on */}
        <Content>
          <Step />
        </Content>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  stepID: state.createBoardWizardReducer.stepID,
});

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateBoardWizard);
