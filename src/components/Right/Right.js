import { Avatar } from 'antd';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { AuthContext } from '../../contexts/AuthContext';
import { db } from '../../firebase/config';
import './Right.scss';
const Right = () => {
    const { following, userImpl, setOpenProfileOwner, setOpenProfile, setUserInfo } = useContext(AppContext);
    const { currentUser } = useContext(AuthContext);

    const handleUnFollow = async (item) => {
        const followingData = userImpl[0].following.filter((follow) => follow !== item.uid);
        const followData = userImpl[0].follows.filter((follow) => follow !== item.uid);
        await Promise.all([
            updateDoc(doc(db, 'users', currentUser.uid), {
                following: [...followingData],
            }),
            updateDoc(doc(db, 'users', item.uid), {
                follows: [...followData],
            }),
        ]);
    };

    const handleShowUserInfo = (data) => {
        setUserInfo(data);
        setOpenProfile(false);
        setOpenProfileOwner(true);
    };

    return (
        <div>
            <h2 className="friend-title">Đang theo dõi</h2>
            <ul className="friend-list">
                {following?.map((item) => {
                    return (
                        <li className="friend-item" key={item.uid} onClick={() => handleShowUserInfo(item)}>
                            <div>
                                <Avatar className="friend-avatar" size={32} src={item.photoURL} />
                                <span className="friend-name">{item.displayName}</span>
                            </div>
                            <button className="friend-btn-unfl" onClick={() => handleUnFollow(item)}>
                                Bỏ theo dõi
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Right;
