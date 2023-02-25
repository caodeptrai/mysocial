import { Col, Row } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

const MainLayout = ({ children }) => {
    return (
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
    );
};

export default MainLayout;
