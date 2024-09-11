import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSocket } from '../../contexts/SocketContext';
import { SellerType } from '../../types/Product/PostProb';
import Header from '../Header/Header';
import { useGetProfileQuery, useGetSellerProfileQuery, useGetUserSentQuery } from '../../services/user/user.service';
import { UserProfile } from '../../types/user';
import { Avatar, List, notification, Spin } from 'antd';
import { useGetMessagesQuery } from '../../services/chat/chat.service';
import { MessageType } from '../../types/chat';

const DUMMY_USER_ID = 0;

const Chat = () => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { recipient } = location.state || {};
  const [sellerInfor, setSellerInfor] = useState<SellerType>();
  const [sellerProfile, setSellerProfile] = useState<UserProfile>();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [sellerCache, setSellerCache] = useState<{ [key: number]: UserProfile }>({});
  const [message, setMessage] = useState<string>('');
  const [activeUserId, setActiveUserId] = useState<number>(recipient?.userId || DUMMY_USER_ID);
  const lastMessageRef = useRef<HTMLLIElement>(null);
  const [userLists, setUserLists] = useState<UserProfile[]>();

  const { data: profileData, isError: profileError, isLoading: profileLoading } = useGetSellerProfileQuery(activeUserId, {
    skip: !activeUserId
  });
  
  const { data: UserData, isError: userError } = useGetProfileQuery();
  
  const { data: MessagesData, error: messagesError, isLoading: messagesLoading } = useGetMessagesQuery(
    { sender: UserData?.data?.user?.userId ?? 0, recipient: activeUserId ?? 0 },
    { skip: !UserData?.data?.user?.userId || !activeUserId }
  );
const token = localStorage.getItem('token')

  useEffect(() => {
    // Kiểm tra token và điều hướng nếu không có
    if (!token) {
      navigate('/login');
      return;
    }
  }, [UserData, navigate]);

  useEffect(() => {
    if (MessagesData) {
      setMessages(MessagesData);
    }
  }, [MessagesData]);

  useEffect(() => {
    if (profileError || messagesError || userError) {
      setError('Lỗi kết nối. Vui lòng tải lại trang hoặc đăng nhập lại.');
      notification.error({
        message: 'Chat Failed',
        description: 'Có lỗi xảy ra khi tải dữ liệu.',
        placement: 'top'
      });
      setLoading(false);
    } else {
      setError('');
      if (!profileLoading && !messagesLoading) {
        setLoading(false);
      }
    }
  }, [profileError, messagesError, userError, profileLoading, messagesLoading]);

  const { data } = useGetUserSentQuery();

  const socket = useSocket();

  useEffect(() => {
    if (recipient) {
      console.log('Chatting with recipient:', recipient.name);
      setSellerInfor(recipient);
    }
  }, [recipient]);

  const sendMessage = () => {
    if (socket && sellerInfor && message.trim()) {
      socket.send(`/app/chatwith/${sellerInfor.userId}`, {}, message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        // Gửi tin nhắn
        sendMessage();
  
        // Tạo đối tượng tin nhắn mới
        const newMessage: MessageType = {
          messageId: Date.now(), // Sử dụng timestamp làm ID tin nhắn (có thể thay đổi)
          sender: UserData?.data?.user?.userId ?? 0,
          recipient: activeUserId,
          content: message,
          messageType: 'text', // Hoặc loại tin nhắn khác nếu cần
          createAt: new Date().toISOString(), // Thời gian tạo tin nhắn
        };
  
        // Cập nhật danh sách tin nhắn
        setMessages((prevMessages) => [...prevMessages, newMessage]);
  
        // Xóa nội dung tin nhắn sau khi gửi
        setMessage('');
      }
    }
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (profileData && !sellerCache[activeUserId]) {
      setSellerProfile(profileData.data);
      setSellerCache(prev => ({ ...prev, [activeUserId]: profileData.data }));
    } else if (sellerCache[activeUserId]) {
      setSellerProfile(sellerCache[activeUserId]);
    }
  }, [profileData, activeUserId, sellerCache]);

  useEffect(() => {
    if (data && recipient && profileData) {
      const isUserInList = data.data.some((user: UserProfile) => user.user.userId === profileData.data.user.userId);
      
      if (!isUserInList && profileData.data.user.userId !== UserData?.data.user.userId) {
        const newUserList = [...(data.data || []), profileData.data];
        setUserLists(newUserList);
      } else {
        setUserLists(data.data);
      }
    }
  }, [data, recipient, profileData, UserData]);

  const handleUserSelect = (userId: number) => {
    setActiveUserId(userId);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
  }

  return (
    <div className="h-screen bg-lime-500 flex flex-col overflow-hidden">
      <div className="h-1/6 bg-blue-500">
        <Header />
      </div>
      <div className="flex flex-1 bg-slate-500 h-[90%] pb-3">
        <Sidebar activeUserId={activeUserId} onUserSelect={handleUserSelect} userLists={userLists} />
        <div className="w-3/4 h-full bg-red-600 flex flex-col">
          <UserInfo recipident={sellerProfile} />
          <Messages messages={messages} lastMessageRef={lastMessageRef} />
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

const Sidebar = ({ activeUserId, onUserSelect, userLists }: { activeUserId: number | null, onUserSelect: (userId: number) => void, userLists: UserProfile[] | undefined }) => (
  <div className="w-1/4 h-full bg-pink-800">
    <h1 className="h-[10%] bg-cyan-800 font-bold flex items-center justify-center">
      Danh sách User
    </h1>
    <div className="h-[90%] bg-black overflow-auto">
      {userLists && userLists.map((user) => {
        const userId = user.user.userId;
        const isActive = activeUserId === userId;
        return (
          <div
            key={userId}
            className={`py-2 flex px-4 shadow-sm mb-2 ${isActive ? 'bg-blue-400' : 'bg-white'}`}
            onClick={() => onUserSelect(userId)}
          >
            <Avatar src={user.profileImageUrl || 'https://secure.gravatar.com/avatar/f53779b5676d15e4a7aeeef9c81fa564?s=70&d=wavatar&r=g'} />
            <h1>{user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.user.username}</h1>
          </div>
        );
      })}
    </div>
  </div>
);

const UserInfo = ({ recipident }: { recipident: UserProfile | undefined }) => (
  <div className="p-4 bg-blue-100 h-1/6">
    <h3 className="text-lg font-semibold">Thông tin người dùng</h3>
    <div className='flex space-x-10 p-3'>
      <div>
        <Avatar size={'large'} src={recipident?.profileImageUrl || "https://secure.gravatar.com/avatar/f53779b5676d15e4a7aeeef9c81fa564?s=70&d=wavatar&r=g"} alt="a" />
      </div>
      <div>
        <p>Username: {recipident?.firstName} {recipident?.lastName}</p>
        <p>Email: {recipident?.user.email}</p>
      </div>
    </div>
  </div>
);

const Messages = ({ messages, lastMessageRef }: { messages: MessageType[], lastMessageRef: React.RefObject<HTMLLIElement> }) => (
  <ul className="flex-1 overflow-y-auto h-4/6 p-4">
    {messages.map((msg, index) => (
      <li
        key={index}
        className={`mb-2 p-2 bg-gray-200 rounded`}
        ref={index === messages.length - 1 ? lastMessageRef : null}
      >
        {msg.content}
      </li>
    ))}
  </ul>
);

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
  <div className="p-4 bg-gray-100 flex items-center">
    <textarea
      className="flex-1 p-2 border rounded"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={handleKeyDown}
      rows={2}
    />
    <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white p-2 rounded">
      Gửi
    </button>
  </div>
);

export default Chat;


// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useSocket } from '../../contexts/SocketContext';
// import { SellerType } from '../../types/Product/PostProb';
// import Header from '../Header/Header';
// import { useGetProfileQuery, useGetSellerProfileQuery, useGetUserSentQuery } from '../../services/user/user.service';
// import { UserProfile } from '../../types/user';
// import { Avatar, List, notification } from 'antd';
// import { useGetMessagesQuery } from '../../services/chat/chat.service';
// import { MessageType } from '../../types/chat';
// const DUMMY_USER_ID = 0;
// const Chat = () => {
//   const [error, setError] = useState('');
//   // laay thong tin user tu state navigation bar
//   const location = useLocation();
//   const { recipient } = location.state || {};
//   const [sellerInfor, setSellerInfor] = useState<SellerType>();
//   const [sellerProfile, setSellerProfile] = useState<UserProfile>();
//   // render messages
//   const [messages, setMessages] = useState<MessageType[]>([]);
//   const [sellerCache, setSellerCache] = useState<{[key: number]: UserProfile}>({}); // toi uu performance for not invented the wheel =)))
//   const [message, setMessage] = useState('');
//   const [activeUserId, setActiveUserId] = useState<number>(recipient?.userId || DUMMY_USER_ID);
//   const lastMessageRef = useRef<HTMLLIElement>(null); // Ref cho tin nhắn cuối
//   const [userLists,setUserLists] = useState<UserProfile[]>();
//   const { data: profileData, isError: profileError, isLoading: profileLoading, refetch: refetchSellerProfile } = useGetSellerProfileQuery(activeUserId, {
//     skip: !activeUserId
//   });
  
//   const {data : UserData} = useGetProfileQuery();

//   // Chỉ gọi useGetMessagesQuery khi có thông tin user và recipient
//  const { data: MessagesData, error: messagesError, isLoading: messagesLoading } = useGetMessagesQuery(
//     { sender: UserData?.data?.user?.userId ?? 0, recipient: activeUserId ?? 0 },
//     {
//       skip: !UserData?.data?.user?.userId || !activeUserId, // Bỏ qua query nếu thiếu userId hoặc activeUserId
//     }
//   );

//   // Xử lý khi có dữ liệu messages
//   useEffect(() => {
//     if (MessagesData) {
//       setMessages(MessagesData);
//     }
//   }, [MessagesData]);

//   useEffect(() => {
//     if (profileError || messagesError) {
//       setError('Lỗi kết nối. Vui lòng tải lại trang hoặc đăng nhập lại.');
//       notification.error({
//         message: 'Login Failed',
//         description: 'poor you =))',
//         placement: 'top' 
//       })
      
//     } else {
//       setError('');
//     }
//   }, [profileError, messagesError]);
// //  LOGIC

//     // lay ds usersent
//     const {data} = useGetUserSentQuery();











//   // connect socket 
//   const socket = useSocket();
//   useEffect(() => {
    
//     console.log('Chatting with recipient:', recipient.name);
//     setSellerInfor(recipient);
//   }, [recipient]);

//   const sendMessage = () => {
//     if (socket && sellerInfor && message.trim()) {
//       socket.send(`/app/chatwith/${sellerInfor.userId}`, {}, message);
//       // setMessages((prevMessages) => [...prevMessages, message]); // Thêm tin nhắn vào danh sách
//       setMessage(''); // Xóa nội dung trong input sau khi gửi
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage(); // Gửi tin nhắn khi nhấn Enter
//     }
//   };

//   // Cuộn tới tin nhắn cuối khi có tin nhắn mới
//   useEffect(() => {
//     if (lastMessageRef.current) {
//       lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

// /*
//   cho nay dung de reusable data da get
//   Tái Sử Dụng Dữ liệu Cache: Nếu dữ liệu cho activeUserId đã có trong cache, 
//   thì dữ liệu được tái sử dụng bằng cách đặt sellerProfile với giá trị từ cache thay vì từ API.

// */

//   useEffect(() => {
//     if (profileData && !sellerCache[activeUserId]) {
//       setSellerProfile(profileData.data);
//       setSellerCache(prev => ({ ...prev, [activeUserId]: profileData.data }));
//     } else if (sellerCache[activeUserId]) {
//       setSellerProfile(sellerCache[activeUserId]);
//     }
//   }, [profileData, activeUserId, sellerCache]);


//   // logic cap nhat userlist
//   useEffect(() => {
//     if (data && recipient && profileData) {
//       // Kiểm tra nếu recipient.userId không có trong userList
//       const isUserInList = data?.data.some((user: UserProfile) => user.user.userId === profileData.data.user.userId);
      
//       // Nếu không có thì thêm recipient vào danh sách
//       if (!isUserInList && profileData.data.user.userId != UserData?.data.user.userId) {
//         const newUserList = [...(data?.data || []), profileData.data];
//         setUserLists(newUserList); // Cập nhật lại userList với người mới
//       } else {
//         setUserLists(data?.data); // Nếu đã có trong danh sách, chỉ cần set lại
//       }
//     }
//   }, [data, recipient]);
  
//   const handleUserSelect = (userId: number) => {
//     setActiveUserId(userId);
//     // Logic to update sellerInfor based on selected user 
//   };
//   return (
//     <div className="h-screen bg-lime-500 flex flex-col overflow-hidden">
//       <div className="h-1/6 bg-blue-500">
//         <Header />
//       </div>
//       <div className="flex flex-1 bg-slate-500 h-[90%] pb-3">
//       <Sidebar activeUserId={activeUserId} onUserSelect={handleUserSelect}  userLists={userLists}/>
//         <div className="w-3/4 h-full bg-red-600 flex flex-col">
//           <UserInfo recipident={sellerProfile}/>
//           {/* Truyền danh sách tin nhắn vào  */}
//           <Messages messages={messages} lastMessageRef={lastMessageRef} />
//           <SendMessage
//             message={message} 
//             setMessage={setMessage}
//             sendMessage={sendMessage}
//             handleKeyDown={handleKeyDown} // Xử lý sự kiện khi nhấn Enter
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const Sidebar = ({ activeUserId, onUserSelect, userLists }: { activeUserId: number | null, onUserSelect: (userId: number) => void, userLists: UserProfile[] | undefined }) => (
//   <div className="w-1/4 h-full bg-pink-800">
//     <h1 className="h-[10%] bg-cyan-800 font-bold flex items-center justify-center">
//       Danh sách User
//     </h1>
//     <div className="h-[90%] bg-black overflow-auto">
//       {userLists && userLists.map((user, index) => {
//         const userId = user.user.userId; // Lấy giá trị userId thực sự
//         const isActive = activeUserId === userId; // So sánh với activeUserId
//         return (
//           <div
//             key={userId}
//             className={`py-2 flex px-4 shadow-sm mb-2 ${isActive ? 'bg-blue-400' : 'bg-white'}`}
//             onClick={() => onUserSelect(userId)} // Set đúng userId khi người dùng được chọn
//           >
//             <Avatar src={user.profileImageUrl ? user.profileImageUrl : 'https://secure.gravatar.com/avatar/f53779b5676d15e4a7aeeef9c81fa564?s=70&d=wavatar&r=g'} />
//             <h1>{user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.user.username}</h1>
//           </div>
//         );
//       })}
//     </div>
//   </div>
// );


// const UserInfo = ({recipident} : {recipident : UserProfile | undefined}) => (
//   <div className="p-4 bg-blue-100 h-1/6">
//     <h3 className="text-lg font-semibold">Thông tin người dùng</h3>
//     <div className='flex space-x-10 p-3'>

//     <div>
//     <Avatar size={'large'} src={recipident && recipident.profileImageUrl ? recipident.profileImageUrl :  "https://secure.gravatar.com/avatar/f53779b5676d15e4a7aeeef9c81fa564?s=70&d=wavatar&r=g"  } alt="a" />
//       {/* <img src={recipident && recipident.profileImageUrl ? recipident.profileImageUrl :  "https://secure.gravatar.com/avatar/f53779b5676d15e4a7aeeef9c81fa564?s=70&d=wavatar&r=g"  } alt="a" /> */}
//     </div>
//     <div>

//     <p>Username: {recipident && recipident.firstName + " " + recipident.lastName}</p>
//     <p>Email: {recipident && recipident.user.email}</p>
//     </div>
//     </div>
//   </div>
// );

// const Messages = ({ messages, lastMessageRef }: { messages: MessageType[], lastMessageRef: React.RefObject<HTMLLIElement> }) => (
//   <ul className="flex-1 overflow-y-auto h-4/6 p-4">
//     {messages.map((msg, index) => (
//       <li
//         key={index}
//         className={`mb-2 p-2 bg-gray-200 rounded`}
//         ref={index === messages.length - 1 ? lastMessageRef : null} // Gán ref cho tin nhắn cuối cùng
//       >
//         {msg.content}
//       </li>
//     ))}
//   </ul>
// );

// const SendMessage = ({
//   message,
//   setMessage,
//   sendMessage,
//   handleKeyDown,
// }: {
//   message: string;
//   setMessage: React.Dispatch<React.SetStateAction<string>>;
//   sendMessage: () => void;
//   handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
// }) => (
//   <div className="p-4 bg-gray-100 flex items-center">
//     <textarea
//       className="flex-1 p-2 border rounded"
//       value={message}
//       onChange={(e) => setMessage(e.target.value)}
//       onKeyDown={handleKeyDown} // Gọi hàm xử lý khi nhấn phím
//       rows={2}
//     />
//     <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white p-2 rounded">
//       Gửi
//     </button>
//   </div>
// );
// export default Chat;
