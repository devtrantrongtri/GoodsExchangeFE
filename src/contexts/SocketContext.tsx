import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import SockJs from "sockjs-client";
import StompJs from "stompjs";

import { useGetProfileQuery } from "../services/user/user.service"; // Giả sử bạn đang dùng redux toolkit query
import { notification } from 'antd';


const SocketContext = createContext<StompJs.Client | null>(null);
export default SocketContext;
export const useSocket = () => useContext(SocketContext);

const token = localStorage.getItem('token'); // Lấy token từ localStorage


export const SocketProvider = ({ children} : {children: React.ReactNode}) => {
    const token = localStorage.getItem('token');
    const {data} = useGetProfileQuery(undefined,{skip : !token})
    const [stompClient,setStompClient] =  useState<StompJs.Client | null>(null);
    const [messageContext,setMessageContext] = useState('')
    
    const connectSocket =useCallback(()=>{

        if(data?.data.user.userId){
          const sockjs = new SockJs(`${import.meta.env.VITE_BASE_SOCKET}?token=${token}`);
          const client = StompJs.over(sockjs);
          
          client.connect({}, () => {
              console.log("Connected to WebSocket with token in query params");
              setStompClient(client);
          });
      
        }else{
          notification.open({
            message:"Messages",
            description:"Login to chat !",
            pauseOnHover:true
          })
        }
    },[data])

    useEffect(() => {
        connectSocket();
    
        // Cleanup socket connection when component unmounts
        return () => {
          if (stompClient) {
            stompClient.disconnect(() => {
              console.log("Disconnected from WebSocket");
            });
          }
        };
      }, [connectSocket,data]);
    
      return (
        <SocketContext.Provider value={stompClient}>
          {children}
        </SocketContext.Provider>
      );
    };
    