// Dependencies
import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// Externals
import FallbackItem from 'components/misc/FallbackItem';
import Logo from 'components/misc/Logo';
import Nav from 'components/misc/Nav';
// Relative
import ITEMS from './ITEMS';
import { NoContent, Wrapper } from './styles';

const Dashboard = ({ selectedItem }) => {
  // Derive the main content.
  const Content = ITEMS[selectedItem];

  return (
    <Wrapper>
      {/* SEO */}
      <Helmet defaultTitle="Barn Pals" titleTemplate="Barn Pals | %s">
        <title>Dashboard</title>
        <meta
          name="description"
          content="For entrepreneurs, thinkers, and product managers, Barn Pals's product management software helps you achieve your goals."
        />
      </Helmet>

      {/* Side Nav Menu */}
      <Nav />

      {/* Content */}
      <Suspense fallback={<FallbackItem />}>
        {Content ? (
          <Content />
        ) : (
          <NoContent>
            <Logo includeText to="/dashboard" />
          </NoContent>
        )}
      </Suspense>
    </Wrapper>
  );
};

Dashboard.propTypes = {
  selectedItem: PropTypes.string,
};

const mapStateToProps = (state) => ({
  selectedItem: state.dashboardReducer.selectedItem,
});

export default connect(
  mapStateToProps,
  null,
)(Dashboard);
