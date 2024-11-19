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
  console.log('name', name);
  const trimmedName = name.trim();
  const splitName = checkForSpace(trimmedName);
  return {
    sx: {
      bgcolor: stringToColor(trimmedName),
    },
    children: splitName
      ? `${trimmedName.split(' ')[0][0]}${trimmedName.split(' ')[1][0]}`
      : `${trimmedName.split(' ')[0][0]}`,
  };
}

function checkForSpace(string) {
  if (string.indexOf(' ') >= 0) {
    return true;
  }
  return false;
}
