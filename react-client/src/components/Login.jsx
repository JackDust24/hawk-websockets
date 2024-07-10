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
    <div className='m-auto p-4'>
      <div className='bg-cyan-100 mt-7.5 mx-auto py-4 px-4 w-[500px] border-indigo-950 shadow-2xl border-2'>
        <div className='text-left'>
          <p className='my-2 uppercase text-4xl font-bold	leading-7'>Welcome!</p>
          <p className='pt-2 my-2 text-xl text-slate-500'>Join the chat</p>
        </div>
        <input
          name='username'
          onInput={(e) => setUsername(e.target.value)}
          className='my-2 p-2 border-[1px] rounded border-gray-500 w-[300px]'
          placeholder='Enter your username'
        />
        <button
          type='button'
          onClick={() => logInUser()}
          className='flex bg-blue-500 hover:bg-blue-600 active:bg-blue-700 mx-auto mt-4 px-6 py-2 text-2xl rounded-md shadow-lg text-slate-100 font-extrabold'
        >
          Join
        </button>
      </div>
    </div>
  );
}
