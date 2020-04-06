// Dependencies
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
// Relative
import { Title, StyledLink, Wrapper } from './styles';

class NotFound extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Wrapper>
        {/* SEO */}
        <Helmet defaultTitle="Barn Pals" titleTemplate="Barn Pals | %s">
          <title>Not Found</title>
          <meta name="description" content="Oops! We don't have that page." />
          <meta name="robots" content="noindex, follow" />
        </Helmet>

        {/* 404 Page Content */}
        <Title>Oops! That page doesn&apos;t exist.</Title>
        <StyledLink to="/">Go to Sign In</StyledLink>
      </Wrapper>
    );
  }
}

export default NotFound;
