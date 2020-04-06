// Dependencies
import { combineReducers } from 'redux';
// Externals
import accountsReducer from 'containers/Account/reducer';
import authReducer from 'containers/Auth/reducer';
import boardsReducer from 'containers/Boards/reducer';
import bottomBarReducer from 'containers/BottomBar/reducer';
import createBoardWizardReducer from 'containers/CreateBoardWizard/reducer';
import dashboardReducer from 'containers/Dashboard/reducer';
import motivationsReducer from 'containers/Motivations/reducer';
import modalReducer from 'containers/Modal/reducer';
import nodesReducer from 'containers/Nodes/reducer';
import notesReducer from 'containers/Notes/reducer';
import organizationsReducer from 'containers/Organizations/reducer';
import photosReducer from 'containers/Photos/reducer';
import recommendationsReducer from 'containers/Recommendations/reducer';
import registerReducer from 'containers/Register/reducer';
import routesReducer from 'containers/Routes/reducer';
import universalNotificationsReducer from 'containers/UniversalNotifications/reducer';

const allReducers = combineReducers({
  accountsReducer,
  authReducer,
  boardsReducer,
  bottomBarReducer,
  createBoardWizardReducer,
  dashboardReducer,
  motivationsReducer,
  modalReducer,
  nodesReducer,
  notesReducer,
  organizationsReducer,
  photosReducer,
  recommendationsReducer,
  registerReducer,
  routesReducer,
  universalNotificationsReducer,
});

export default allReducers;
