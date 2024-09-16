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
import { Link } from 'react-router-dom';
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
  useEffect(() => {
    if (recipient && recipient.userId) {
      setActiveUserId(recipient.userId);
    } else if (userListsState && userListsState.length > 0) {
      // Nếu không có recipient, chọn người dùng đầu tiên trong danh sách làm activeUserId mặc định
      setActiveUserId(userListsState[0].user.userId);
    }else{
      setActiveUserId(0);
    }
  }, [recipient, userListsState])
  // NOTE : QUERY
  // Query message for each recipident.
  const { data: MessagesData, error: messagesError, isLoading: messagesLoading, refetch: refetchMessageList } = useGetMessagesQuery(
    activeUserId && UserState?.user.userId && RecipientState[activeUserId]?.user.userId ? { sender: UserState.user.userId, recipient: activeUserId} : skipToken // Avoid the query if either is undefined
  );
  // Query for User data
  const { data: UserData, isError: userError } = useGetProfileQuery();
  // get particular recipident profile 
  const { data: RecipientData, isError: RecipientError, isLoading: RecipientLoading } = useGetSellerProfileQuery(activeUserId ? activeUserId : skipToken);
  const { data: RecipientDataNew, isError: RecipientErrorNew, isLoading: RecipientLoadingNew } = useGetSellerProfileQuery(recipient ? recipient.userId : skipToken);
  // get users list exits or sent eachothers
  const { data:UserSentData,isError:UserSentError,isLoading:UserSentLoading} = useGetUserSentQuery();
  const [unreadCounts, setUnreadCounts] = useState<{ [key: number]: number }>({});
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
                  // Kiểm tra và cập nhật userListsState từ UserSentData
                  if (UserSentData && !UserSentError) {
                    setUserListsState(UserSentData.data);
                  } else if (UserSentError) {
                    console.error(UserSentError);
                  }

                  // Kiểm tra xem có dữ liệu recipient mới và không có lỗi không
                  if (RecipientDataNew && !RecipientErrorNew && activeUserId) {
                    const newRecipient = RecipientDataNew.data;
                    const recipientId = newRecipient.user.userId;

                    // Kiểm tra xem recipient có phải là user hiện tại không
                    const isCurrentUser = UserData?.data.user.userId === recipientId;

                    // Kiểm tra xem recipient đã tồn tại trong UserSentData hay chưa
                    const isInUserSent = UserSentData?.data.some((user: UserProfileType) => user.user.userId === recipientId);

                    // Nếu recipient không phải là user hiện tại và chưa tồn tại trong UserSentData
                    if (!isCurrentUser && !isInUserSent) {
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

                      // Thông báo cho người dùng rằng recipient mới đã được thêm
                      notification.success({
                        message: 'Recipient Added',
                        description: `Đã thêm ${newRecipient.user.username} vào danh sách người dùng tạm thời.`,
                        placement: 'topLeft',
                      });
                    }
                  }
                }, [UserSentData, UserSentError, RecipientDataNew, RecipientErrorNew, UserData]);


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
    // Kiểm tra xem dữ liệu có cần được cập nhật không, tránh cập nhật không cần thiết
    SetMessagesCache((prevState) => {
      const currentMessages = prevState[activeUserId] || [];
      // Chỉ cập nhật nếu MessagesData khác với dữ liệu hiện tại
      if (JSON.stringify(currentMessages) !== JSON.stringify(MessagesData)) {
        return {
          ...prevState,
          [activeUserId]: MessagesData,
        };
      }
      return prevState; // Giữ nguyên nếu không có sự thay đổi
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
    if (socket && UserState?.user.userId && activeUserId) {
      // socket.subscribe(`/queue/${UserState.user.userId}`,(msg) => {
      const subscription = socket.subscribe(
        "/user/queue/private/chat",
        (msg) => {
          // Xử lý tin nhắn nhận được
          const content: MessageSendType = JSON.parse(msg.body);
          const newMessage: MessageType = {
            messageId: Date.now(),
            recipient: content.recipient,
            sender: content.sender,
            content: content.content,
            messageType: "text",
            createAt: new Date().toISOString(),
          };

          SetMessagesCache((prev) => ({
            ...prev,
            [content.sender]: prev[content.sender]
              ? [...prev[content.sender], newMessage]
              : [newMessage],
          }));

          if (activeUserId !== content.sender) {
          }

          if (activeUserId === content.sender) {
            // audio for message comming
            var snd = new Audio(
              "data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="
            );
            snd.play();
            notification.info({
              message: "New message",
              placement: "top",
            });
          } else {
            var snd = new Audio(
              "data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="
            );
            snd.play();
            // Kiểm tra xem tin nhắn có phải từ người đang hoạt động hay không
            // Tăng số lượng tin nhắn chưa đọc cho người gửi
            setUnreadCounts((prev) => ({
              ...prev,
              [content.sender]: (prev[content.sender] || 0) + 1,
            }));
            const newUser1 = RecipientState[content.sender];
            const UserNameClient =
              newUser1.firstName && newUser1.lastName
                ? newUser1.firstName + " " + newUser1.lastName
                : newUser1.user.username;
            notification.info({
              message: "New message",
              description: `Có tin nhắn mới từ ${
                newUser1 ? UserNameClient : "người lạ"
              }`,
              placement: "top",
            });
          }
        }
      );

      // Cleanup function để hủy đăng ký
      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    }
  }, [socket, UserState, activeUserId]);


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
        description:"You have to login for this service !"
      })
    }
  };

  useEffect(() => {
    if (activeUserId !== null) {
      setUnreadCounts((prev) => ({
        ...prev,
        [activeUserId]: 0,
      }));
    }
  }, [activeUserId]);
  
  
  
  const handleUserSelect = (userId: number) => {
    refetchMessageList()
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
  
  if (messagesLoading || RecipientLoading  || RecipientLoadingNew || UserSentLoading) {
      return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
          {/* Loading spinner */}
          <Spin size="large" className="mb-8">
            <h1 className="font-bold text-red-700 text-4xl capitalize">Loading ... or have some error</h1>
          </Spin>
    
          {/* Link to go home */}
          <Link to="/" className="text-red-600 text-4xl capitalize hover:text-red-800 mt-12">
            Go Home
          </Link>
        </div>
      );
    };
  
  return (
    <div className="h-screen bg-gradient-to-r from-cyan-500  flex flex-col overflow-hidden">
      {/* <div className="h-1/6 "> */}
        <Header />
      {/* </div> */}
      <div className="flex flex-1 bg-cyan-700 h-[90%] pb-3">
        <Sidebar activeUserId={activeUserId} onUserSelect={handleUserSelect} userLists={userListsState}  unreadCounts={unreadCounts} />
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

const Sidebar = ({ activeUserId, onUserSelect, userLists ,unreadCounts }: { activeUserId: number | null, onUserSelect: (userId: number) => void, userLists: UserProfileType[] | undefined ,unreadCounts: { [key: number]: number };}) => (
  <div className="w-1/4 h-full bg-slate-900">
    <h1 className="h-[10%] bg-cyan-800 font-bold flex items-center justify-center text-white">
      Danh sách User
    </h1>
    <div className="h-[90%] overflow-auto p-2">
      {userLists && userLists.length > 0 ? (
        userLists.map((user) => {
          const userId = user.user.userId;
          const isActive = activeUserId === userId;
          const unread = unreadCounts[userId] || 0;
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
              {unread > 0 && (
                <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {unread}
                </span>
              )}
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
