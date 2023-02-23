import { Col, Row } from 'antd';
import Header from '../components/Header/Header';

import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import AppProvider, { AppContext } from '../contexts/AppContext';
import { AuthContextProvider } from '../contexts/AuthContext';
import { ChatContextProvider } from '../contexts/ChatContext';

export const AuthLayout = () => {
    return (
        <AuthContextProvider>
            <Outlet />
        </AuthContextProvider>
    );
};

export const AppLayout = () => {
    return (
        <AppProvider>
            <Outlet />
        </AppProvider>
    );
};

export const ChatLayout = () => {
    return (
        <ChatContextProvider>
            <Outlet />
        </ChatContextProvider>
    );
};

export const Layout = () => {
    const { darkMode } = useContext(AppContext);
    return (
        <div className="App">
            <div className={darkMode ? 'dark-mode' : 'light-mode'}>
                <Header />
                <Row>
                    <Col span={6}>
                        <Sidebar />
                    </Col>
                    <Col className="page-content" span={18}>
                        <div className="page-container">
                            <Outlet />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
