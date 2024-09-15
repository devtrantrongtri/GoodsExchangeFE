import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSocket } from '../../contexts/SocketContext';
import { SellerType } from '../../types/Product/PostProb';
import Header from '../Header/Header';
import { useGetProfileQuery, useGetSellerProfileQuery, useGetUserSentQuery } from '../../services/user/user.service';
import { UserProfileType } from '../../types/user';
import { Avatar, List, notification, Spin } from 'antd';
import { useGetMessagesQuery } from '../../services/chat/chat.service';
import { MessageSendType, MessageType } from '../../types/chat';
import moment from 'moment'; 
import { skipToken } from '@reduxjs/toolkit/query';
// const DUMMY_USER_ID = 0;

const Chat = () => {
  // ultils
  const navigate = useNavigate();
  const location = useLocation();
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const socket = useSocket();
  const lastMessageRef = useRef<HTMLLIElement>(null);

  // Objects State
  const [RecipientState,SetRecipientState] = useState<{[key:number]:UserProfileType}>({});
  const [UserState,SetUserState] = useState<UserProfileType>();
  const [MessagesCache, SetMessagesCache] = useState<{ [key: number]: MessageType[] }>({}); // obj key : array
  const [message, setMessage] = useState<string>('');
  const [userListsState, setUserListsState] = useState<UserProfileType[]>();
  const { recipient }: { recipient: SellerType | undefined } = location.state || {};
  const [activeUserId, setActiveUserId] = useState<number|null>(recipient?.userId || null);

  // NOTE : QUERY
  // Query message for each recipident.
  const { data: MessagesData, error: messagesError, isLoading: messagesLoading, refetch: refetchMessageList } = useGetMessagesQuery(
    activeUserId && UserState?.user.userId && RecipientState[activeUserId]?.user.userId ? { sender: UserState.user.userId, recipient: RecipientState[activeUserId].user.userId} : skipToken // Avoid the query if either is undefined
  );
  // Query for User data
  const { data: UserData, isError: userError } = useGetProfileQuery();
  // get particular recipident profile 
  const { data: RecipientData, isError: RecipientError, isLoading: RecipientLoading } = useGetSellerProfileQuery(activeUserId ? activeUserId : skipToken);
  const { data: RecipientDataNew, isError: RecipientErrorNew, isLoading: RecipientLoadingNew } = useGetSellerProfileQuery(recipient ? recipient.userId : skipToken);
  // get users list exits or sent eachothers
  const { data:UserSentData,isError:UserSentError} = useGetUserSentQuery();
  
// init data for User,Particular Recipident, Messages if true.
 // Update UserState when UserData changes
 useEffect(() => {
  if (UserData && !userError) {
    SetUserState(UserData.data);
  } else if (userError) {
    notification.warning({
      message: "User data wasn't imported yet!",
      pauseOnHover: true,
      placement: 'topLeft',
    });
  }
}, [UserData, userError]);

// Update userListsState when UserSentData changes
useEffect(() => {
  if (UserSentData && !UserSentError) {
    setUserListsState(UserSentData.data);
  } else if (UserSentError) {
    console.error(UserSentError);
  }
}, [UserSentData, UserSentError]);

useEffect(() => {
  // Kiểm tra xem có dữ liệu recipient mới và không có lỗi không
  if (RecipientDataNew && !RecipientErrorNew && activeUserId) {
    const newRecipient = RecipientDataNew.data;
    const recipientId = newRecipient.user.userId;

    // Kiểm tra xem recipient đã tồn tại trong UserSentData hay chưa
    const isInUserSent = UserSentData?.data.some((user: UserProfileType) => user.user.userId === recipientId);

    if (!isInUserSent) {
      // Thêm recipient mới vào userListsState
      setUserListsState((prev) => {
        // Tránh thêm nếu userListsState chưa được khởi tạo
        if (!prev) return [newRecipient];
        
        // Kiểm tra xem recipient đã tồn tại trong userListsState chưa để tránh trùng lặp
        const exists = prev.some((user) => user.user.userId === recipientId);
        if (!exists) {
          return [...prev, newRecipient];
        }
        return prev;
      });

      // Tùy chọn: Thông báo cho người dùng rằng recipient mới đã được thêm
      notification.success({
        message: 'Recipient Added',
        description: `Đã thêm ${newRecipient.user.username} vào danh sách người dùng tạm thời.`,
        placement: 'topLeft',
      });
    }
  }
}, []);

// Update RecipientState when RecipientData changes
useEffect(() => {
  if (RecipientData && !RecipientError && activeUserId) {
    SetRecipientState((prevState) => ({
      ...prevState,
      [activeUserId]: RecipientData.data,
    }));
  } else if (RecipientError) {
    notification.info({
      message: 'Check a seller for chat!',
      pauseOnHover: true,
      placement: 'topLeft',
    });
  }
}, [RecipientData, RecipientError, activeUserId,socket]);

// Update MessagesCache when MessagesData changes
useEffect(() => {
  if (!messagesError && MessagesData && activeUserId) {
    SetMessagesCache((prevState) => {
      console.log(1)
      if (prevState[activeUserId]) {
        // If messages already exist in the cache, keep them
        return prevState;
      } else {
        // If no messages exist, use the fetched MessagesData
        return {
          ...prevState,
          [activeUserId]: MessagesData,
        };
      }
    });
  } else if (messagesError) {
    notification.warning({
      message: "Messages weren't rendered yet!",
      pauseOnHover: true,
      placement: 'topLeft',
    });
  }
}, [MessagesData, messagesError, activeUserId]);

  // check lastest message.
  useEffect(() => {
    if (activeUserId && MessagesCache[activeUserId]) {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [activeUserId, MessagesCache[activeUserId || 0 ]]);
  


useEffect(() => {
    // khi co socket va thong tin user, se lang nghe tin nhan tu nguoi dung khac
    if(socket &&  UserState?.user.userId && activeUserId){

      // socket.subscribe(`/queue/${UserState.user.userId}`,(msg) => {
        const subscription = socket.subscribe('/user/queue/private/chat', (msg) => {
          // Xử lý tin nhắn nhận được
          const content: MessageSendType = JSON.parse(msg.body);
          const newMessage: MessageType = {
            messageId: Date.now(),
            recipient: content.recipient,
            sender: content.sender,
            content: content.content,
            messageType: 'text',
            createAt: new Date().toISOString(),
          };
    
          SetMessagesCache((prev) => ({
            ...prev,
            [content.sender]: prev[content.sender]
              ? [...prev[content.sender], newMessage]
              : [newMessage],
          }));
    
          if (activeUserId === content.sender) {
            notification.info({
              message: 'New message',
              description: `1, from ${content.sender}`,
              placement: 'top',
            });
          } else {
            notification.info({
              message: 'New message',
              description: `Có tin nhắn mới từ ${content.sender}`,
              placement: 'top',
            });
          }
        });
    
        // Cleanup function để hủy đăng ký
        return () => {
          if (subscription) {
            subscription.unsubscribe();
          }
        };
      }

  }, [socket,UserState,activeUserId]);


  const sendMessage = () => {
    if (socket && UserState && RecipientState && message.trim() && activeUserId) {
      console.log("activeUserId : " , activeUserId)
      const newMessage : MessageSendType = {
        sender: UserState.user.userId,
        recipient: RecipientState[activeUserId].user.userId,
        content: message,
        messageType: 'TEXT',
      }

      socket.send(`/app/chatwith/${activeUserId}`, {}, JSON.stringify(newMessage));
      const completeMessage = {
        ...newMessage,
        messageId: Date.now(),
        createAt: new Date().toISOString(),
      };
      // luu tin nhan moi vo client
      SetMessagesCache(prev => ({
        ...prev,
        [activeUserId]: prev[activeUserId] ? [...prev[activeUserId], completeMessage] : [completeMessage]
      }));
      console.log(3)
      
      setMessage('');
    }else{
      notification.warning({
        placement:"topLeft",
        message : "Error when send message with socket !",
        description:"Have error while send a message, like the seller infor didnt exits !"
      })
    }
  };

  
  // if (loading) {
    //   return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
    // }
    
    
    const handleUserSelect = (userId: number) => {
      setActiveUserId(userId);
    };
  // hanle key down and send message
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        // Gửi tin nhắn
        sendMessage();
        // Xóa nội dung tin nhắn sau khi gửi
        setMessage('');
      }
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-cyan-500  flex flex-col overflow-hidden">
      {/* <div className="h-1/6 "> */}
        <Header />
      {/* </div> */}
      <div className="flex flex-1 bg-cyan-700 h-[90%] pb-3">
        <Sidebar activeUserId={activeUserId} onUserSelect={handleUserSelect} userLists={userListsState} />
        <div className="w-3/4 h-full  flex flex-col">
          <UserInfo recipident={activeUserId ? RecipientState[activeUserId]: undefined} />
          <Messages messages={activeUserId ? MessagesCache[activeUserId] : []} lastMessageRef={lastMessageRef} sender = {UserState} recipident={activeUserId ? RecipientState[activeUserId]: undefined}  />
          <SendMessage
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            handleKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ activeUserId, onUserSelect, userLists }: { activeUserId: number | null, onUserSelect: (userId: number) => void, userLists: UserProfileType[] | undefined }) => (
  <div className="w-1/4 h-full bg-slate-900">
    <h1 className="h-[10%] bg-cyan-800 font-bold flex items-center justify-center text-white">
      Danh sách User
    </h1>
    <div className="h-[90%] overflow-auto p-2">
      {userLists && userLists.length > 0 ? (
        userLists.map((user) => {
          const userId = user.user.userId;
          const isActive = activeUserId === userId;
          return (
            <div
              key={userId}
              className={`py-2 flex items-center px-4 shadow-sm mb-2 cursor-pointer ${isActive ? 'bg-blue-400' : 'bg-white'} hover:bg-blue-300 transition-colors`}
              onClick={() => onUserSelect(userId)}
            >
              <Avatar
                className="w-8 h-8 mr-3"
                src={user.profileImageUrl || 'https://secure.gravatar.com/avatar/f53779b5676d15e4a7aeeef9c81fa564?s=70&d=wavatar&r=g'}
              />
              <h1 className="text-black font-medium">{user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.user.username}</h1>
            </div>
          );
        })
      ) : (
        <div className="text-white text-center mt-4">
          Không có người dùng nào.
        </div>
      )}
    </div>
  </div>
);

const UserInfo = ({ recipident }: { recipident: UserProfileType | undefined }) => {
  if (!recipident) {
    return (
      <div className="p-4 bg-gradient-to-r from-cyan-500 shadow-md h-1/6 flex items-center justify-center">
        <p className="text-xl text-white">Không có thông tin người dùng</p>
      </div>
    );
  }
  return (
  <div className="p-4 bg-gradient-to-r from-cyan-500 shadow-md h-1/6">
    <h3 className="text-2xl  font-semibold">Thông tin Seller</h3>
    <div className='flex space-x-10 p-3 text-2xl'>
      <div>
        <Avatar className='w-16 h-16' size={'large'} src={recipident?.profileImageUrl || "https://secure.gravatar.com/avatar/f53779b5676d15e4a7aeeef9c81fa564?s=70&d=wavatar&r=g"} alt="a" />
      </div>
      <div>
        <p>Username: {recipident?.firstName} {recipident?.lastName}</p>
        <p>Email: {recipident?.user.email}</p>
      </div>
    </div>
  </div>
  )
};
const Messages = ({ messages, lastMessageRef, sender, recipident }: { messages: MessageType[], lastMessageRef: React.RefObject<HTMLLIElement>, sender: UserProfileType | undefined, recipident: UserProfileType | undefined }) => {
  const userId = sender ? sender.user.userId : 0;

  // Kiểm tra nếu không có tin nhắn hoặc người dùng
  if (!messages || !sender || !recipident) {
    return (
      <div className="flex-1 flex items-center justify-center h-4/6 p-4">
        {(!sender || !recipident) ? (
          <p className="text-gray-500">Không có thông tin người dùng.</p>
        ) : (
          <p className="text-gray-500">Chưa có tin nhắn nào.</p>
        )}
      </div>
    );
  }
  return (
    <ul className="flex-1 overflow-y-auto h-4/6 p-4 space-y-2 ">
      {messages.map((msg, index) => {
        const isSender = msg.sender === userId;

        return (
          <li
            key={index}
            className={`flex items-start ${isSender ? 'justify-end' : 'justify-start'} space-x-3`}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            {/* Avatar chỉ hiển thị cho người nhận */}
            {!isSender && (
              <Avatar
                src={recipident ? recipident.profileImageUrl : `https://www.gravatar.com/avatar/${msg.sender}?d=robohash`} 
                className="w-8 h-8"
              />
            )}
            <div
              className={`relative flex-1 max-w-xs p-3 rounded-lg shadow-2xl ${isSender ? 'bg-teal-900 text-white' : 'bg-teal-600 text-white'}`}
            >
              <div className="text-sm font-semibold mb-1">
                {isSender ? 'You' : `User ${msg.sender}`}
              </div>
              <div className="text-sm mb-1 break-words">
                {msg.content}
              </div>
              <div className="absolute bottom-2 right-2 text-xs text-black font-bold">
                {moment(msg.createAt).format('DD MMM YYYY, HH:mm')}
              </div>
            </div>
            {/* Avatar chỉ hiển thị cho người gửi */}
            {isSender && (
              <Avatar
                src={sender ? sender.profileImageUrl : `https://www.gravatar.com/avatar/${msg.sender}?d=robohash`} 
                className="w-8 h-8"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

const SendMessage = ({
  message,
  setMessage,
  sendMessage,
  handleKeyDown,
}: {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}) => (
  <div className="p-4 bg-gradient-to-r from-cyan-950 flex items-center">
    <textarea
      className="flex-1 p-2 border rounded bg-cyan-700 text-white text-2xl"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={handleKeyDown}
      rows={2}
    />
    <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white p-3 rounded hover:bg-blue-600 active:bg-cyan-600">
      Gửi
    </button>
  </div>
);

export default Chat;
