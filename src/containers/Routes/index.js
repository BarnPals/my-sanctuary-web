// Dependencies
import React, { Component, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
// Externals
import FallbackRoute from 'components/pages/FallbackRoute';
import Modal from 'containers/Modal';
import UniversalNotifications from 'containers/UniversalNotifications';
import history from 'store/history';
// Relative
import { appInitAction } from './actions';
import { Container } from './styles';

// Lazy load pages.
const CreateBoardWizard = lazy(() => import('containers/CreateBoardWizard'));
const Dashboard = lazy(() => import('containers/Dashboard'));
const Login = lazy(() => import('components/pages/Login'));
const NotFound = lazy(() => import('components/pages/NotFound'));
const Register = lazy(() => import('components/pages/Register'));
const ResetPassword = lazy(() => import('components/pages/ResetPassword'));

class Routes extends Component {
  static propTypes = {
    // From mapDispatchToProps.
    appInit: PropTypes.func.isRequired,
  };

  componentDidMount() {
    // Make all of our app init calls.
    this.props.appInit({ initFirebase: true });

    // Log out our current environment.
    console.info(
      `Inspecting web pages, huh? At Barn Pals we're looking for people like you to join us as remote web developers (JavaScript - React + Node). If you're interested please contact team@barnpals.org!`,
    );

    // Prevent zooming on mobile.
    document.addEventListener('touchmove', this.onTouchMove);
  }

  componentWillUnmount() {
    document.removeEventListener('touchmove', this.onTouchMove);
  }

  onTouchMove = (event) => {
    if (event.scale !== 1) {
      event.preventDefault();
    }
  };

  render() {
    return (
      <Router history={history}>
        <Container>
          {/* NOTIFICATIONS */}
          <UniversalNotifications />

          {/* MODAL */}
          <Modal />

          {/* ROUTES (@NOTE: <main> added for accessibility) */}
          <main style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', width: '100%' }}>
            <Suspense fallback={<FallbackRoute />}>
              <Switch>
                {/* UNAUTHENTICATED ROUTES */}
                <Route path="/" exact component={(props) => <Login {...props} />} />
                <Route path="/register" exact component={(props) => <Register {...props} />} />
                <Route path="/reset-password" exact component={(props) => <ResetPassword {...props} />} />
                {/* AUTH MODEL-BASED ROUTES */}
                <Route path="/boards/create" exact component={(props) => <CreateBoardWizard {...props} />} />
                <Route path="/dashboard" exact component={(props) => <Dashboard {...props} />} />
                {/* 404 | NOT FOUND */}
                <Route component={(props) => <NotFound {...props} />} />
              </Switch>
            </Suspense>
          </main>
        </Container>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  appInit: (options) => dispatch(appInitAction(options)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Routes);
