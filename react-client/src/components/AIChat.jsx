import React, { useState, useEffect, useRef } from 'react';
import useWebSocket from 'react-use-websocket';
import { Send, User, Bot, Clock } from 'lucide-react';
import { WS_URL } from '../api/websockets-helpers';

const AI_CHAT_WS_URL = `${WS_URL}/ai-chat`;
const AI_CHAT_MESSAGE_TYPE = 'ai_chat';

const AiChatAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [rateLimitInfo, setRateLimitInfo] = useState(null);
  const messagesEndRef = useRef(null);

  // WebSocket hook configuration
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    AI_CHAT_WS_URL,
    {
      shouldReconnect: () => true,
      reconnectAttempts: 5,
      reconnectInterval: 3000,
    }
  );

  //   // Handle incoming WebSocket messages
  //   useEffect(() => {
  //     if (lastMessage) {
  //       try {
  //         const parsedMessage = JSON.parse(lastMessage.data);

  //         if (parsedMessage.type === AI_CHAT_MESSAGE_TYPE) {
  //           if (parsedMessage.data.error) {
  //             // Handle error scenario
  //             setMessages((prev) => [
  //               ...prev,
  //               {
  //                 sender: 'system',
  //                 message: parsedMessage.data.error,
  //                 timestamp: parsedMessage.data.timestamp,
  //               },
  //             ]);
  //           } else {
  //             // Add AI response to messages
  //             setMessages((prev) => [
  //               ...prev,
  //               {
  //                 sender: 'ai',
  //                 message: parsedMessage.data.message,
  //                 timestamp: parsedMessage.data.timestamp,
  //               },
  //             ]);
  //           }
  //         }
  //       } catch (error) {
  //         console.error('Error parsing message:', error);
  //       }
  //     }
  //   }, [lastMessage]);

  // Handle incoming WebSocket messages
  useEffect(() => {
    if (lastMessage) {
      try {
        const parsedMessage = JSON.parse(lastMessage.data);

        // Handle rate limit error
        if (parsedMessage.type === 'rate_limit_error') {
          setRateLimitInfo({
            message: parsedMessage.data.message,
            retryAfter: parsedMessage.data.retryAfter,
          });

          // Add system message about rate limit
          setMessages((prev) => [
            ...prev,
            {
              sender: 'system',
              message: parsedMessage.data.message,
              timestamp: new Date().toISOString(),
            },
          ]);

          // Optional: Start a countdown timer
          startRateLimitCountdown(parsedMessage.data.retryAfter);
        } else if (parsedMessage.type === AI_CHAT_MESSAGE_TYPE) {
          if (parsedMessage.data.error) {
            // Handle error scenario
            setMessages((prev) => [
              ...prev,
              {
                sender: 'system',
                message: parsedMessage.data.error,
                timestamp: parsedMessage.data.timestamp,
              },
            ]);
          } else {
            // Add AI response to messages
            setMessages((prev) => [
              ...prev,
              {
                sender: 'ai',
                message: parsedMessage.data.message,
                timestamp: parsedMessage.data.timestamp,
              },
            ]);
          }
        }
      } catch (error) {
        console.error('Message parsing error:', error);
      }
    }
  }, [lastMessage]);

  // Countdown timer for rate limit
  const startRateLimitCountdown = (seconds) => {
    let remainingSeconds = seconds;
    const countdownInterval = setInterval(() => {
      remainingSeconds--;
      if (remainingSeconds <= 0) {
        clearInterval(countdownInterval);
        setRateLimitInfo(null);
      }
    }, 1000);
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    console.error('handleSendMessage');
    if (rateLimitInfo) return;

    if (!inputMessage.trim()) return;

    // Add user message locally
    setMessages((prev) => [
      ...prev,
      {
        sender: 'user',
        message: inputMessage,
        timestamp: new Date().toISOString(),
      },
    ]);

    // Send message via WebSocket
    sendMessage(
      JSON.stringify({
        type: AI_CHAT_MESSAGE_TYPE,
        message: inputMessage,
      })
    );

    // Clear input
    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div className='flex flex-col h-[600px] max-w-md mx-auto bg-white shadow-lg rounded-xl'>
      {rateLimitInfo && (
        <div className='bg-yellow-100 text-yellow-800 p-2 flex items-center'>
          <Clock className='mr-2' />
          <span>{rateLimitInfo.message}</span>
        </div>
      )}

      {/* Chat Header */}
      <div className='bg-blue-500 text-white p-4 rounded-t-xl flex items-center'>
        <Bot className='mr-2' />
        <h2 className='text-lg font-semibold'>AI Loyalty Assistant</h2>
      </div>

      {/* Messages Container */}
      <div className='flex-grow overflow-y-auto p-4 space-y-3'>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`
              p-3 rounded-lg max-w-[70%]
              ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : msg.sender === 'ai'
                  ? 'bg-gray-200 text-black'
                  : 'bg-red-100 text-red-800'
              }
            `}
            >
              <div className='flex items-center'>
                {msg.sender === 'user' ? (
                  <User className='mr-2 w-5 h-5' />
                ) : msg.sender === 'ai' ? (
                  <Bot className='mr-2 w-5 h-5' />
                ) : null}
                <span>{msg.message}</span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className='p-4 border-t flex items-center'>
        <input
          type='text'
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder='Ask about your loyalty program...'
          disabled={!!rateLimitInfo}
          className={`
            flex-grow p-2 border rounded-l-lg 
            ${
              rateLimitInfo
                ? 'bg-gray-200 cursor-not-allowed'
                : 'focus:outline-none focus:ring-2 focus:ring-blue-500'
            }
          `}
        />
        <button
          onClick={handleSendMessage}
          disabled={!!rateLimitInfo}
          className={`
            ${
              rateLimitInfo
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            } 
            text-white p-2 rounded-r-lg transition
          `}
        >
          <Send className='w-6 h-6' />
        </button>
      </div>
    </div>
  );
};

export default AiChatAssistant;
