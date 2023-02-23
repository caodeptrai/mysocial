import { Col, Row } from 'antd';
import React from 'react';
import ChatWindow from '../ChatWindow/ChatWindow';
import UserChats from '../../components/UserChats/UserChats';
import './Inbox.scss';
const Inbox = () => {
    return (
        <div>
            <Row>
                <Col span={7}>
                    <UserChats />
                </Col>
                <Col span={17}>
                    <ChatWindow />
                </Col>
            </Row>
        </div>
    );
};

export default Inbox;
