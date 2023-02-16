import { Avatar } from 'antd'
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { AppContext } from '../../contexts/AppContext'
import { AuthContext } from '../../contexts/AuthContext'
import { db } from '../../firebase/config'
import './Left.scss'
const Left = () => {
 
   const {followers,userImpl,following,setUserInfo,setOpenProfileOwner,setOpenProfile} = useContext(AppContext)

  const {currentUser} = useContext(AuthContext)
  const [propose,setPropose] = useState()

   useEffect(()=> {
   const unsub =  setPropose (following.length > 0 ? followers.filter((x)=> !following.find(y =>y.uid === x.uid)) : followers)
   return unsub;
   },[followers, following])
   
  const handleFollow = async (item)=> {
    
    setPropose( propose.filter((data)=>data.uid !== item.uid))

    await Promise.all([
      updateDoc(doc(db,"users",currentUser.uid),{
          following:[...userImpl[0].following,item.uid],
          }),
      updateDoc(doc(db,"users",item.uid),{
          follows:[...item.follows,userImpl[0].uid],
          }) 
  ])
 
    handleNotification(item)
  }

  const handleShowUserInfo = (data)=> {
    setUserInfo(data)
    setOpenProfile(false)
    setOpenProfileOwner(true)
    
  }


  
    const handleNotification = (data) => {
      
      // Socket.emit("sendNotification", {
      //    senderName: currentUser.displayName,
      //   receiverName: data.displayName,
      //   type:1,
      // });

      console.log("data",data)

    

    };
  return (
    <div>
      <h2 className='propose-title'>Đề xuất</h2>
      <ul className='propose-list'>
        {propose?.map((item,index)=>{
          return(
            <li className='propose-item' key={item.uid} onClick={()=> handleShowUserInfo(item)}>
              <div>
                <Avatar className='propose-avatar' size={32} src={item?.photoURL}/>
                <span className='propose-name'>{item?.displayName}</span>
              </div>
                <button className='propose-btn-fl' onClick={()=>handleFollow(item)}>Theo dõi</button>
            </li>
          )
        })}
      </ul>

    </div>
  )
}

export default Left