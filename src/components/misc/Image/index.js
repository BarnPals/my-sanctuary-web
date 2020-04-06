// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import cloneDeep from 'lodash/cloneDeep';
// Relative
import { Wrapper } from './styles';

const imageLoading =
  'https://firebasestorage.googleapis.com/v0/b/my-sanctuary-barnpals-prod.appspot.com/o/public%2Fimages%2FimageLoading.png?alt=media';

class Image extends Component {
  static propTypes = {
    alt: PropTypes.string.isRequired,
    fallbackSrc: PropTypes.string,
    onError: PropTypes.func,
    onLoad: PropTypes.func,
    src: PropTypes.string.isRequired,
    wrapperClassName: PropTypes.string,
  };

  static defaultProps = {
    fallbackSrc: imageLoading,
    onError: () => {},
    onLoad: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      fallbackSrc: undefined,
      loaded: false,
    };
  }

  cleanProps = () => {
    const cleanedProps = cloneDeep(this.props);

    // Ensure some props do not go to the DOM.
    delete cleanedProps.alt;
    delete cleanedProps.fallbackSrc;
    delete cleanedProps.onError;
    delete cleanedProps.onLoad;
    delete cleanedProps.src;

    return filterInvalidDOMProps(cleanedProps);
  };

  onErrorHandler = (event) => {
    if (window.FS) {
      window.FS.log('warn', `Unable to load image: ${this.props.src}`);
    }
    this.setState({ fallbackSrc: this.props.fallbackSrc, loaded: true });
    this.props.onError(event);
  };

  onLoadHandler = (event) => {
    this.setState({ loaded: true });
    this.props.onLoad(event);
  };

  render() {
    const { cleanProps, onErrorHandler, onLoadHandler } = this;
    const { fallbackSrc, loaded } = this.state;
    const { alt, src, wrapperClassName } = this.props;

    // Loading state.
    if (!loaded) {
      return (
        <Wrapper className={wrapperClassName} show>
          <img {...cleanProps()} alt={alt} src={imageLoading} />
          <img
            {...cleanProps()}
            alt={alt}
            onError={onErrorHandler}
            onLoad={onLoadHandler}
            src={fallbackSrc || src}
            style={{ display: 'none' }}
          />
        </Wrapper>
      );
    }

    // Both src and fallback src state.
    return (
      <Wrapper className={wrapperClassName} show={loaded}>
        <img {...cleanProps()} alt={alt} onError={onErrorHandler} onLoad={onLoadHandler} src={fallbackSrc || src} />
      </Wrapper>
    );
  }
}

export default Image;
