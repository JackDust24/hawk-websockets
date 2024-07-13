import { createContext, useContext, useMemo, useState } from 'react';

type ChatAccess = {
  username: string | null;
  onLogin: (usernname: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
};

const ChatContext = createContext<ChatAccess | undefined>(undefined);

export const useChatContext = (): ChatAccess => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext can not be used outside ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: React.ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps): JSX.Element => {
  const [username, setUsername] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const onLogin = (_username: string) => {
    if (!_username) return;
    setUsername(_username);
    setIsLoggedIn(true);
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    setUsername(null);
  };

  const chatAccessInfo = useMemo(
    () => ({
      username,
      isLoggedIn,
      onLogin,
      onLogout,
    }),
    [username, isLoggedIn, onLogin, onLogout]
  );

  return (
    <ChatContext.Provider value={chatAccessInfo}>
      {children}
    </ChatContext.Provider>
  );
};
