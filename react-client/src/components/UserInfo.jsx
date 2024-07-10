import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import useWebSocket from 'react-use-websocket';
import { WS_URL, isUserEvent } from '../api/websockets-helpers';
import { stringAvatar } from '../helpers/avatar-helper';

export function UserInfo() {
  // Info about the users
  const { lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    filter: isUserEvent,
  });
  const users = Object.values(lastJsonMessage?.data.users || {});

  if (users.length === 0) {
    return <div>No Users have joined</div>;
  }

  return users.map((user) => (
    <div key={user.username} className='mr-4'>
      <Tooltip title={user.username}>
        <span id={user.username} className='userInfo' key={user.username}>
          <Avatar {...stringAvatar(user.username)} />
        </span>
      </Tooltip>
    </div>
  ));
}
