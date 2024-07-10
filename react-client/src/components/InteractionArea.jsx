import { ChatArea } from "./ChatArea";
import { UserHistory } from "./UserHistory";
import { UserInfo } from "./UserInfo";

export function InteractionArea() {
    return (
      <div className='main-content'>
        <div className='document-holder'>
          <div className='currentusers'>
            <UserInfo />
          </div>
          <ChatArea />
        </div>
        <div className='history-holder'>
          <UserHistory />
        </div>
      </div>
    );
  }