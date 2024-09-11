import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import SockJs from "sockjs-client";
import StompJs from "stompjs";

import { useGetProfileQuery } from "../services/user/user.service"; // Giả sử bạn đang dùng redux toolkit query


const SocketContext = createContext<StompJs.Client | null>(null);
export default SocketContext;
export const useSocket = () => useContext(SocketContext);


export const SocketProvider = ({ children} : {children: React.ReactNode}) => {
    const token = localStorage.getItem('token');
    const {data} = useGetProfileQuery(undefined,{skip : !token})
    const [stompClient,setStompClient] =  useState<StompJs.Client | null>(null);
    
    
    const connectSocket =useCallback(()=>{

        if(data?.data.user.userId){
            const sockjs = new SockJs(import.meta.env.VITE_BASE_SOCKET)
            const client = StompJs.over(sockjs);

            client.connect({},() => {
                console.log("connected socket successfully !")

                // subcirbe 

                client.subscribe(`/queue/${data.data.user.userId}`,(msg) => {
                    console.log("Received private message:", msg);
                })

                // client.subscribe


                // Set client vào state
                setStompClient(client);
            });
        
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
    