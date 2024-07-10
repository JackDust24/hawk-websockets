import React, { useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { WS_URL, isContentEvent } from '../api/websockets-helpers';
import background from '../assets/bground.jpg';
import { cn } from '../utils/merge';

export function ChatArea(props) {
  const { username } = props;

  const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    filter: isContentEvent,
  });

  const [message, setMessage] = useState('');

  let content = lastJsonMessage?.data.editorContent || [];

  function handleHtmlChange(e) {
    sendJsonMessage({
      type: 'content',
      content: message,
      username: username,
    });
    setMessage('');
  }

  return (
    <>
      <div className='flex jusify-between gap-2'>
        <input
          name='message'
          value={message}
          onInput={(e) => setMessage(e.target.value)}
          className='my-2 p-2 border-[1px] rounded border-gray-500 w-[300px]'
          placeholder='Enter a message'
        />
        <button
          type='button'
          onClick={() => handleHtmlChange()}
          className=' bg-blue-500 hover:bg-blue-600 active:bg-blue-700 px-2 my-2 text-lg rounded-md shadow-lg text-slate-100 font-extrabold'
        >
          Send
        </button>
      </div>
      <div className='bg-white z-50 border-2 border-gray-500 min-h-[500px] h-[500px] relative w-[300px] overflow-y-auto'>
        <div
          className='absolute inset-0 bg-cover bg-center opacity-20'
          style={{ backgroundImage: `url(${background})` }}
        ></div>
        <ul className='relative'>
          {[...content].reverse().map((content, index) => (
            <li
              key={`activity-${index}`}
              className={cn(
                'p-2 font-extrabold',
                username === content.user && 'text-blue-700 text-right'
              )}
            >
              {content.user}: {content.content}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
