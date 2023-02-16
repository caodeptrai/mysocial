import React, { useContext, useEffect, useState } from 'react'
import { io } from "socket.io-client";
import { AuthContext } from './AuthContext';


export const SocketContext = React.createContext();
const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState();
    const {currentUser} = useContext(AuthContext)
    useEffect(() => {
        setSocket(io("http://localhost:5000"));
         
       }, []);
  
       useEffect(() => {
         socket?.emit("newUser", currentUser);
       }, [currentUser, socket]);


  return (
    <SocketContext.Provider value={{socket}}>
        {children}
    </SocketContext.Provider>
  )
    
}

export default SocketProvider