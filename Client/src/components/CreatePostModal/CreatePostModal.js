import { Modal } from 'antd'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../contexts/AppContext'
import {addDoc, collection} from 'firebase/firestore';
import { db, storage } from '../../firebase/config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import './CreatePostModal.scss'
import { AuthContext } from '../../contexts/AuthContext';
import {v4 as uuidv4} from 'uuid';

const CreatePostModal = () => {
    const {isVisibleCreatePost,setIsVisibleCreatePost} = useContext(AppContext)
    const [status,setStatus] = useState('')
    const [file,setFile] = useState('')
    const {currentUser} = useContext(AuthContext);

    const handleOk = async ()=> {
        try {
            const date = new Date().getTime();
            const storageRef = ref(storage, `${status + date}`);
    
          await uploadBytesResumable(storageRef, file)
          .then(() => {
            getDownloadURL(storageRef)
            .then(async (downloadURL) => {
              try {
             await addDoc(collection(db, "posts"), {
                id:uuidv4(),
                creatorId:currentUser.uid,
                status:status,
                photoURL:downloadURL,
                likes:[],
                createAt:Date.now()
                    
             })
                setIsVisibleCreatePost(false)
              } catch (err) {
                console.log("thêm bài viết thất bại !!!")
              }
            });
          });
            
          } catch (error) {
            console.log("thêm bài viết thất bại !!!")
          }

          setStatus('')
    }

    const handleCancel =()=> {
        setIsVisibleCreatePost(false)
        setStatus('');
        setFile('')
    }
  return (
    <Modal 
        title='Tạo bài viết'
        open={isVisibleCreatePost}
        onOk={handleOk}
        onCancel={handleCancel}
        >
        <div className='container-post'>

        <textarea
            className='input-status'
            placeholder='bạn đang nghĩ gì...?'
            value={status}
            onChange={(e)=>setStatus(e.target.value)}
        />
        <input required  
                type="file" 
                id="file" 
                onChange = {(e)=>setFile(e.target.files[0])}
                />
        </div>
    </Modal>
  )
}

export default CreatePostModal