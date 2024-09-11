import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSocket } from '../../contexts/SocketContext';
import { SellerType } from '../../types/Product/PostProb';
import Header from '../Header/Header';

const Chat = () => {
  // laay thong tin user tu state navigation bar
  const location = useLocation();
  const { recipient } = location.state || {};
  const [sellerInfor, setSellerInfor] = useState<SellerType>();
  // render messages
  const [messages, setMessages] = useState<string[]>(["f"]);
  const [message, setMessage] = useState('');
  const lastMessageRef = useRef<HTMLLIElement>(null); // Ref cho tin nhắn cuối

  // connect socket 
  const socket = useSocket();
  useEffect(() => {
    
    console.log('Chatting with recipient:', recipient.name);
    setSellerInfor(recipient);
  }, [recipient]);

  const sendMessage = () => {
    if (socket && sellerInfor && message.trim()) {
      socket.send(`/app/chatwith/${sellerInfor.userId}`, {}, message);
      setMessages((prevMessages) => [...prevMessages, message]); // Thêm tin nhắn vào danh sách
      setMessage(''); // Xóa nội dung trong input sau khi gửi
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(); // Gửi tin nhắn khi nhấn Enter
    }
  };

  // Cuộn tới tin nhắn cuối khi có tin nhắn mới
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  
  return (
    <div className="h-screen bg-lime-500 flex flex-col overflow-hidden">
      <div className="h-1/6 bg-blue-500">
        <Header />
      </div>
      <div className="flex flex-1 bg-slate-500 h-[90%] pb-3">
        <Sidebar />
        <div className="w-3/4 h-full bg-red-600 flex flex-col">
          <UserInfo />
          {/* Truyền danh sách tin nhắn vào  */}
          <Messages messages={messages} lastMessageRef={lastMessageRef} />
          <SendMessage
            message={message} 
            setMessage={setMessage}
            sendMessage={sendMessage}
            handleKeyDown={handleKeyDown} // Xử lý sự kiện khi nhấn Enter
          />
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => (
  <div className="w-1/4 h-full bg-pink-800">
    <h1 className="h-[10%] bg-cyan-800 font-bold flex items-center justify-center">
      Danh sách User
    </h1>
    <div className="h-[90%] bg-black overflow-auto">
      {Array.from({ length: 30 }, (_, index) => (
        <div key={index} className="py-2 px-4 bg-white shadow-sm mb-2">
          User {(index % 3) + 1}
        </div>
      ))}
    </div>
  </div>
);

const UserInfo = () => (
  <div className="p-4 bg-blue-100 h-1/6">
    <h3 className="text-lg font-semibold">Thông tin người dùng</h3>
    <p>Username: John Doe</p>
    <p>Email: john@example.com</p>
  </div>
);

const Messages = ({ messages, lastMessageRef }: { messages: string[], lastMessageRef: React.RefObject<HTMLLIElement> }) => (
  <ul className="flex-1 overflow-y-auto h-4/6 p-4">
    {messages.map((msg, index) => (
      <li
        key={index}
        className="mb-2 p-2 bg-gray-200 rounded"
        ref={index === messages.length - 1 ? lastMessageRef : null} // Gán ref cho tin nhắn cuối cùng
      >
        {msg}
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
      onKeyDown={handleKeyDown} // Gọi hàm xử lý khi nhấn phím
      rows={2}
    />
    <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white p-2 rounded">
      Gửi
    </button>
  </div>
);
export default Chat;
