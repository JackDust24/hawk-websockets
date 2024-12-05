// Filter for user events only
export function isUserEvent(message) {
  let evt = JSON.parse(message.data);
  return evt.type === 'user';
}

// Filter for content only
export function isContentEvent(message) {
  let evt = JSON.parse(message.data);
  return evt.type === 'content';
}

export const WS_URL_OLD = 'ws://127.0.0.1:8000';

export const WS_URL = 'ws://127.0.0.1:8000';
