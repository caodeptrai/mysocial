import { Col, Row } from 'antd';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import AppProvider from '../contexts/AppContext';
import { AuthContextProvider } from '../contexts/AuthContext';
import { ChatContextProvider } from '../contexts/ChatContext';

export const AuthLayout = () => {
    return (
        <AuthContextProvider>
            <Outlet />
        </AuthContextProvider>
    );
};

export const Layout = () => {
    return (
        <ChatContextProvider>
            <AppProvider>
                <div className="App">
                    <div>
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
            </AppProvider>
        </ChatContextProvider>
    );
};
