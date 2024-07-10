import React from 'react';
import useWebSocket from 'react-use-websocket';
import { WS_URL, isContentEvent } from '../api/websockets-helpers';
import { DefaultEditor } from 'react-simple-wysiwyg';

export function ChatArea() {
    const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_URL, {
      share: true,
      filter: isContentEvent,
    });
  
    let content = lastJsonMessage?.data.editorContent || '';
  
    function handleHtmlChange(e) {  
      sendJsonMessage({
        type: 'content',
        content: e.target.value,
      });
    }
  
    return <DefaultEditor value={content} onChange={handleHtmlChange} />;
  }