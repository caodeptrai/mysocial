import { Avatar } from 'antd';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

import './Right.scss';
const Right = () => {
    const { following, setUserInfo } = useContext(AppContext);

    const handleShowUserInfo = (data) => {
        setUserInfo(data);
    };

    return (
        <div className="right">
            <h2 className="friend-title">Đang theo dõi</h2>
            <ul className="friend-list">
                {following?.map((item) => {
                    return (
                        <Link
                            to={`/profile/${item.displayName}`}
                            className="friend-item"
                            key={item.uid}
                            onClick={() => handleShowUserInfo(item)}
                        >
                            <div>
                                <Avatar className="friend-avatar" size={32} src={item.photoURL} />
                                <span className="friend-name">{item.displayName}</span>
                            </div>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
};

export default Right;
