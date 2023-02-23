import { Col, Row } from 'antd';
import React from 'react';
import Center from '../../components/Center/Center';

import Right from '../../components/Right/Right';

const Home = () => {
    return (
        <div>
            <Row>
                <Col span={15}>
                    <Center />
                </Col>
                <Col span={9}>
                    <Right />
                </Col>
            </Row>
        </div>
    );
};

export default Home;
