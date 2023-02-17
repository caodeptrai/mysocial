import { doc, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import Post from '../../components/Post/Post';
import { AppContext } from '../../contexts/AppContext';
import { AuthContext } from '../../contexts/AuthContext';
import { db } from '../../firebase/config';

import './Profile.scss';
const ProfileOwner = () => {
    const { currentUser } = useContext(AuthContext);
    const { userProfile, userImpl, posts } = useContext(AppContext);
    const [btnFollowVisible, setBtnFollowVisible] = useState(false);
    useEffect(() => {
        const unsub = setBtnFollowVisible(userImpl[0].following.includes(userProfile[0]?.uid));
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
    return (
        <div>
            <div className="pro">
                <div className="pro-background">
                    <div className="pro-info">
                        <div className="pro-info-content">
                            <img className="rightAvatar" src={userProfile[0]?.photoURL} alt="" />
                            <h3 className="info-name">{userProfile[0]?.displayName}</h3>
                        </div>

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
