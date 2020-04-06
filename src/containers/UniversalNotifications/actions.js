// Relative
import { DISMISS_UNIVERSAL_NOTIFICATION, SHOW_UNIVERSAL_NOTIFICATION } from './constants';
import { INFO } from './MESSAGE_TYPES';

export const dismissUniversalNotificationAction = () => ({
  type: DISMISS_UNIVERSAL_NOTIFICATION,
});

export const showUniversalNotificationAction = (options = {}) => ({
  actionText: options.actionText || '',
  autoDismissAfter: options.autoDismissAfter || 5000,
  message: options.message || '',
  messageType: options.messageType || INFO,
  onClickAction: options.onClickAction || (() => {}),
  type: SHOW_UNIVERSAL_NOTIFICATION,
});
