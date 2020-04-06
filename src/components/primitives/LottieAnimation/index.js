// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';

export const LottieAnimation = (props) => (
  <div className={props.className}>
    <Lottie {...props} />
  </div>
);

LottieAnimation.propTypes = {
  className: PropTypes.string,
  isClickToPauseDisabled: PropTypes.bool.isRequired,
  options: PropTypes.shape({
    autoplay: PropTypes.bool.isRequired,
    animationData: PropTypes.object.isRequired,
    loop: PropTypes.bool.isRequired,
  }).isRequired,
};

export default LottieAnimation;
