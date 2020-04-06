// Dependencies
import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Externals
import FallbackNavItem from 'components/misc/FallbackNavItem';
import NAV_ITEMS, { BOARDS_LIST, RECOMMENDATION_REQUESTS_LIST, SETTINGS_LIST } from 'containers/Dashboard/NAV_ITEMS';
import { NODE_ROWS, SETTINGS_PROFILE } from 'containers/Dashboard/ITEMS';
import { selectNavItemAction, selectItemAction } from 'containers/Dashboard/actions';
// Relative
import { Wrapper, NoNavItem, Navbar, BoardsIcon, RecommendationsIcon, SettingsIcon } from './styles';

class Nav extends Component {
  static propTypes = {
    // From mapStateToProps.
    isNavCollapsed: PropTypes.bool.isRequired,
    selectedNavItem: PropTypes.string.isRequired,
    selectedItem: PropTypes.string,
    // From mapDispatchToProps.
    selectNavItem: PropTypes.func.isRequired,
    selectItem: PropTypes.func.isRequired,
  };

  onBoardsClick = () => {
    const { selectNavItem, selectItem, selectedNavItem, selectedItem } = this.props;

    // Select the Boards List nav item.
    if (selectedNavItem !== BOARDS_LIST) {
      selectNavItem(BOARDS_LIST);
    }

    // Select the Node Rows item if it's not already selected.
    if (selectedItem !== NODE_ROWS) {
      selectItem(NODE_ROWS);
    }
  };

  onRecommendationsClick = () => {
    const { selectNavItem, selectItem, selectedNavItem, selectedItem } = this.props;

    // Select the nav item.
    if (selectedNavItem !== RECOMMENDATION_REQUESTS_LIST) {
      selectNavItem(RECOMMENDATION_REQUESTS_LIST);
    }

    // Select the Node Rows item if it's not already selected.
    if (selectedItem !== NODE_ROWS) {
      selectItem(NODE_ROWS);
    }
  };

  onSettingsClick = () => {
    const { selectItem, selectedItem, selectNavItem, selectedNavItem } = this.props;

    // Select the Boards List nav item.
    if (selectedNavItem !== SETTINGS_LIST) {
      selectNavItem(SETTINGS_LIST);
    }

    // Select the Settings Profile item if it's not already selected.
    if (selectedItem !== SETTINGS_PROFILE) {
      selectItem(SETTINGS_PROFILE);
    }
  };

  render() {
    const { onBoardsClick, onRecommendationsClick, onSettingsClick } = this;
    const { isNavCollapsed, selectedNavItem, selectedItem } = this.props;

    // Derive the current nav item.
    const NavItem = NAV_ITEMS[selectedNavItem];

    // Derive if the nav is hidden over 650px. Hidden when there is a selected item and the nav is collapsed.
    const hiddenOnLarge = selectedItem && isNavCollapsed;

    // Derive if the nav is hidden on mobile. Hidden when there's a selectedItem.
    const hiddenOnMobile = !!selectedItem;

    return (
      <Wrapper hiddenOnLarge={hiddenOnLarge} hiddenOnMobile={hiddenOnMobile}>
        {/* Current Nav Item */}
        <Suspense fallback={<FallbackNavItem />}>{NavItem ? <NavItem /> : <NoNavItem />}</Suspense>

        <Navbar>
          {/* Boards Nav Item Icon */}
          <BoardsIcon onClick={onBoardsClick} selected={selectedNavItem === BOARDS_LIST} />

          {/* Recommendation Requests Icon */}
          <RecommendationsIcon
            onClick={onRecommendationsClick}
            selected={selectItemAction === RECOMMENDATION_REQUESTS_LIST}
          />

          {/* Settings Nav Item Icon */}
          <SettingsIcon onClick={onSettingsClick} selected={selectedNavItem === SETTINGS_LIST} />
        </Navbar>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  isNavCollapsed: state.dashboardReducer.isNavCollapsed,
  selectedNavItem: state.dashboardReducer.selectedNavItem,
  selectedItem: state.dashboardReducer.selectedItem,
});

const mapDispatchToProps = (dispatch) => ({
  selectNavItem: (navItem) => dispatch(selectNavItemAction(navItem)),
  selectItem: (item) => dispatch(selectItemAction(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Nav);
