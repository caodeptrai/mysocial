import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Post from '../../components/Post/Post';
import { AppContext } from '../../contexts/AppContext';
import { AuthContext } from '../../contexts/AuthContext';
import { ChatContext } from '../../contexts/ChatContext';
import { db } from '../../firebase/config';

import './Profile.scss';
const ProfileOwner = () => {
    const { currentUser } = useContext(AuthContext);
    const { userProfile, userImpl, posts } = useContext(AppContext);
    const { dispatch } = useContext(ChatContext);
    const [btnFollowVisible, setBtnFollowVisible] = useState(false);
    useEffect(() => {
        const unsub = setBtnFollowVisible(userImpl[0]?.following.includes(userProfile[0]?.uid));
        return () => unsub;
    }, [userImpl, userProfile]);

    const handleFollow = async () => {
        await Promise.all([
            updateDoc(doc(db, 'users', currentUser.uid), {
                following: [...userImpl[0].following, userProfile[0].uid],
            }),
            updateDoc(doc(db, 'users', userProfile[0].uid), {
                follows: [...userImpl[0].follows, userProfile[0].uid],
            }),
        ]);
    };

    const handleUnFollow = async () => {
        const followingData = userImpl[0].following.filter((follow) => follow !== userProfile[0].uid);
        const followData = userImpl[0].follows.filter((follow) => follow !== userProfile[0].uid);

        await Promise.all([
            updateDoc(doc(db, 'users', currentUser.uid), {
                following: [...followingData],
            }),
            updateDoc(doc(db, 'users', userProfile[0].uid), {
                follows: [...followData],
            }),
        ]);
    };

    const handleChat = async () => {
        //check whether the group(chats in firestore) exists, if not create
        const combinedId =
            currentUser.uid > userProfile[0]?.uid
                ? currentUser.uid + userProfile[0]?.uid
                : userProfile[0]?.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, 'chats', combinedId));

            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, 'chats', combinedId), { messages: [] });

                //create user chats
                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedId]: {
                        userInfo: {
                            uid: userProfile[0]?.uid,
                            displayName: userProfile[0]?.displayName,
                            email: userProfile[0]?.email,
                            photoURL: userProfile[0]?.photoURL,
                        },
                        date: serverTimestamp(),
                    },

                    // viet tat
                    //   [combinedId + ".userInfo"]: {
                    //     uid: user.uid,
                    //     displayName: user.displayName,
                    //     photoURL: user.photoURL,
                    //   },
                    //  [combinedId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, 'userChats', userProfile[0]?.uid), {
                    [combinedId + '.userInfo']: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                        email: userProfile[0]?.email,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });
            }
        } catch (err) {}

        dispatch({ type: 'CHANGE_USER', payload: userProfile[0] });
    };
    return (
        <div>
            <div className="pro">
                <div className="pro-background">
                    <div className="pro-info">
                        <div className="pro-info-content">
                            <img className="rightAvatar" src={userProfile[0]?.photoURL} alt="" />
                            <h3 className="info-name">{userProfile[0]?.displayName}</h3>
                        </div>

                        <Link to={`/inbox/${userProfile[0]?.uid}`} className="btn-chat" onClick={handleChat}>
                            Nhắn tin
                        </Link>

                        {btnFollowVisible ? (
                            <button className="btn-unfollow" onClick={handleUnFollow}>
                                Bỏ theo dõi
                            </button>
                        ) : (
                            <button className="btn-follow" onClick={handleFollow}>
                                Theo dõi
                            </button>
                        )}
                    </div>
                </div>
                <div className="pro-content">
                    <h3 className="introduce">Giới thiệu</h3>

                    <div className="pro-content-pra">
                        <div className="pro-content-pra-item separe">
                            <span className="pro-pra-quantity">{userProfile[0]?.follows?.length}</span>
                            <span>Người theo dõi</span>
                        </div>
                        <div className="pro-content-pra-item separe">
                            <span className="pro-pra-quantity">{userProfile[0]?.following?.length}</span>
                            <span>Đang theo dõi</span>
                        </div>
                        <div className="pro-content-pra-item">
                            <span className="pro-pra-quantity">{posts?.length}</span>
                            <span>Bài viết</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {posts.map((item) => (
                    <Post post={item} key={item.id} />
                ))}
            </div>
        </div>
    );
};

export default ProfileOwner;
