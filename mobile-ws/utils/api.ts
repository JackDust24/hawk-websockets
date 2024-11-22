export const WS_URL = 'ws://127.0.0.1:8000';
export const WS_URL_DEV = 'ws:///192.168.0.125:8000'; // Use and amend this depending on your phone

// Filter for user events only
export function isUserEvent(message: any) {
  let evt = JSON.parse(message.data);
  return evt.type === 'user';
}

// Filter for content only
export function isContentEvent(message: any) {
  let evt = JSON.parse(message.data);
  return evt.type === 'content';
}
