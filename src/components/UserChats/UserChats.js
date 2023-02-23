import { doc, onSnapshot } from 'firebase/firestore';
import { faCircleInfo, faEllipsis, faMessage, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { ChatContext } from '../../contexts/ChatContext';
import { db } from '../../firebase/config';
import './UserChats.scss';
import { Link } from 'react-router-dom';

const UserChats = () => {
    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (u) => {
        dispatch({ type: 'CHANGE_USER', payload: u });
    };

    const content = (
        <div className="popperContent">
            <div className="popperItem">
                <FontAwesomeIcon className="popperIcon" icon={faUser} />
                Người liên hệ đang hoạt động
            </div>
            <div className="popperItem">
                <FontAwesomeIcon className="popperIcon" icon={faMessage} />
                Tin nhắn đang chờ
            </div>
            <div className="popperItem">
                <FontAwesomeIcon className="popperIcon" icon={faCircleInfo} />
                Trợ giúp
            </div>
        </div>
    );
    return (
        <div className="userChats">
            <div className="userChatsContainer">
                <div className="userChatsHeading">
                    <span className="userChatsTitle">Chats</span>
                    <Popover content={content} placement="bottomLeft" title="Tùy chọn" trigger="click">
                        <FontAwesomeIcon className="userChatsIcon" icon={faEllipsis} />
                    </Popover>
                </div>

                <div>
                    {Object.entries(chats)
                        ?.sort((a, b) => b[1].date - a[1].date)
                        .map((chat) => (
                            <Link
                                to={`/inbox/${chat[1].userInfo.uid}`}
                                className="userChat"
                                key={chat[0]}
                                onClick={() => handleSelect(chat[1].userInfo)}
                            >
                                <img src={chat[1].userInfo.photoURL} alt="" />
                                <div className="userChatInfo">
                                    <span>{chat[1].userInfo.displayName}</span>
                                    <p>{chat[1].lastMessage?.text}</p>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default UserChats;
