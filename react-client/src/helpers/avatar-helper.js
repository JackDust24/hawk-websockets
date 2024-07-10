// Code snippet from: https://mui.com/material-ui/react-avatar/
function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

export function stringAvatar(name) {
  const splitName = checkForSpace(name);
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: splitName
      ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
      : `${name.split(' ')[0][0]}`,
  };
}

function checkForSpace(string) {
  if (string.indexOf(' ') >= 0) {
    return true;
  }
  return false;
}
