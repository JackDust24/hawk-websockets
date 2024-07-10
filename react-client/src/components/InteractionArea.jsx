import { ChatArea } from './ChatArea';
import { UserHistory } from './UserHistory';
import { UserInfo } from './UserInfo';

export function InteractionArea() {
  return (
    <div className='flex whitespace-nowrap py-4 px-12 w-10/12 mx-auto bg-cyan-200 overflow-y-auto'>
      <div className='flex-1'>
        <div className='flex my-5'>
          <UserInfo />
        </div>
        <ChatArea />
      </div>
      <div className='w-[340px] bg-slate-200 min-w-[340px] p-2 overflow-x-clip my-20 mx-10 h-fit'>
        <UserHistory />
      </div>
    </div>
  );
}
