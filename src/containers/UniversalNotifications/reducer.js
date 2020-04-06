// Relative
import { DISMISS_UNIVERSAL_NOTIFICATION, SHOW_UNIVERSAL_NOTIFICATION } from './constants';
import { INFO } from './MESSAGE_TYPES';

const initialState = {
  actionText: '',
  autoDismissAfter: 5000,
  message: '',
  messageType: INFO,
  onClickAction: () => {},
  visible: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISMISS_UNIVERSAL_NOTIFICATION: {
      return {
        ...state,
        actionText: '',
        autoDismissAfter: 5000,
        message: '',
        messageType: INFO,
        onClickAction: () => {},
        visible: false,
      };
    }
    case SHOW_UNIVERSAL_NOTIFICATION: {
      return {
        ...state,
        actionText: action.actionText,
        autoDismissAfter: action.autoDismissAfter,
        message: action.message,
        messageType: action.messageType,
        onClickAction: action.onClickAction,
        visible: true,
      };
    }
    default: {
      return { ...state };
    }
  }
};
