import useWebSocket, { ReadyState } from 'react-use-websocket';
import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, UncontrolledTooltip } from 'reactstrap';
import { DefaultEditor } from 'react-simple-wysiwyg';
import Avatar from 'react-avatar';
import './App.css';

const WS_URL = 'ws://127.0.0.1:8000';

function isUserEvent(message) {
  let evt = JSON.parse(message.data);
  return evt.type === 'userevent';
}

function isContentChangeEvent(message) {
  let evt = JSON.parse(message.data);
  return evt.type === 'contentchange';
}

function LoginSection({ onLogin }) {
  const [username, setUsername] = useState('');

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

function Document() {
  const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    filter: isContentChangeEvent,
  });

  let html = lastJsonMessage?.data.editorContent || '';
  console.log(lastJsonMessage?.data.editorContent);

  function handleHtmlChange(e) {
    console.log('handleHtmlChange', lastJsonMessage);

    sendJsonMessage({
      type: 'contentchange',
      content: e.target.value,
    });
  }

  return <DefaultEditor value={html} onChange={handleHtmlChange} />;
}

function History() {
  console.log('history');
  const { lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    filter: isUserEvent,
  });

  const activities = lastJsonMessage?.data.userActivity || [];
  return (
    <ul>
      {activities.map((activity, index) => (
        <li key={`activity-${index}`}>{activity}</li>
      ))}
    </ul>
  );
}

function Users() {
  const { lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    filter: isUserEvent,
  });
  console.log(lastJsonMessage);

  const users = Object.values(lastJsonMessage?.data.users || {});
  console.log('users > ', users);

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

function EditorSection() {
  return (
    <div className='main-content'>
      <div className='document-holder'>
        <div className='currentusers'>
          <Users />
        </div>
        <Document />
      </div>
      <div className='history-holder'>
        <History />
      </div>
    </div>
  );
}

function App() {
  const [username, setUsername] = useState('');

  const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    share: true,
    filter: () => false,
    retryOnError: true,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (username && readyState === ReadyState.OPEN) {
      sendJsonMessage({
        username,
        type: 'userevent',
      });
    }
  }, [username, sendJsonMessage, readyState]);

  return (
    <>
      <Navbar color='light' light>
        <NavbarBrand href='/'>Real-time document editor</NavbarBrand>
      </Navbar>
      <div className='container-fluid'>
        {username ? <EditorSection /> : <LoginSection onLogin={setUsername} />}
      </div>
    </>
  );
}

export default App;
