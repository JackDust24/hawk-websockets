import Avatar from 'react-avatar';
import {  UncontrolledTooltip } from 'reactstrap';
import useWebSocket from 'react-use-websocket';
import { WS_URL, isUserEvent } from '../api/websockets-helpers';

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
      <div key={user.username}>
        <span id={user.username} className='userInfo' key={user.username}>
          <Avatar name={user.username} size={40} round='20px' />
        </span>
        <UncontrolledTooltip placement='top' target={user.username}>
          {user.username}
        </UncontrolledTooltip>
      </div>
    ));
  }