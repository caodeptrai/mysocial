
import React, { useEffect, useState } from 'react'
import {  collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import './PostList.scss'
import Post from '../Post/Post';

// import { SocketContext } from '../../contexts/SocketContext';


const PostList = () => {
    const [posts,setPosts] = useState([])
    //  const {socket} = useContext(SocketContext)

    useEffect( ()=> {
        
     const q = query(collection(db, "posts"),orderBy('createAt'))
          
        const unsubscribe = onSnapshot(q, (doc) => {
            const postdata = [];
            let res = {};
            doc.forEach((doc) => {
                res = {
                    docId: doc.id,
                ...doc.data()
                }
                postdata.push(res);
            });
            setPosts(postdata)
        });
    
       
        
        return () => {
          unsubscribe();
        };
      }, []);


  return (
    <div className='center-container'>
        {posts.map((item)=>(
            <Post post={item} key={item.id}/>
        ))}
        
    </div>
  )
}

export default PostList