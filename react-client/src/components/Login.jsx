import React, { useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { WS_URL } from '../api/websockets-helpers';

export function LoginSection({ onLogin }) {
    const [username, setUsername] = useState('');
  
    // Notify the server a new user has joined
    useWebSocket(WS_URL, {
      share: true,
      filter: () => false,
    });
  
    function logInUser() {
      if (!username.trim()) {
        return;
      }
      onLogin && onLogin(username);
    }
  
    return (
      <div className='account'>
        <div className='account__wrapper'>
          <div className='account__card'>
            <div className='account__profile'>
              <p className='account__name'>Hello, user!</p>
              <p className='account__sub'>Join to edit the document</p>
            </div>
            <input
              name='username'
              onInput={(e) => setUsername(e.target.value)}
              className='form-control'
            />
            <button
              type='button'
              onClick={() => logInUser()}
              className='btn btn-primary account__btn'
            >
              Join
            </button>
          </div>
        </div>
      </div>
    );
  }
  