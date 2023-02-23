import React, { useContext } from 'react';
import Input from '../../components/Input/Input';
import Messages from '../../components/Messages/Messages';
import { ChatContext } from '../../contexts/ChatContext';

import { VideoCameraOutlined, PhoneOutlined } from '@ant-design/icons';
import './ChatWindow.scss';
import { AppContext } from '../../contexts/AppContext';
import Wellcome from '../Wellcome/Wellcome';

const ChatWindow = () => {
    const { data } = useContext(ChatContext);
    const { setIsProfileVisibleUser } = useContext(AppContext);

    const handleInfoUser = () => {
        setIsProfileVisibleUser(true);
    };

    console.log('data', data);
    return (
        <div className="chat">
            <div className="chat-container">
                {!(Object.keys(data.user).length === 0 && data.user.constructor === Object) ? (
                    <>
                        <div className="chatHeader">
                            <>
                                <div className="chatInfo" onClick={handleInfoUser}>
                                    <img className="chatAvatar" src={data.user?.photoURL} alt="" />
                                    <span className="chatName">{data.user?.displayName}</span>
                                </div>
                                <div className="chatIcons">
                                    <span>
                                        <VideoCameraOutlined className="chatIcon" />
                                    </span>
                                    <span>
                                        <PhoneOutlined className="chatIcon" />
                                    </span>
                                </div>
                            </>
                        </div>

                        <Messages />
                        <Input />
                    </>
                ) : (
                    <Wellcome />
                )}
            </div>
        </div>
    );
};

export default ChatWindow;
