import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, FloatButton, Row } from 'antd';
import React, { useContext } from 'react';
import Center from '../../components/Center/Center';
import Header from '../../components/Header/Header';
import Left from '../../components/Left/Left';
import Right from '../../components/Right/Right';
import { AppContext } from '../../contexts/AppContext';

const Home = () => {
    const { setIsVisibleCreatePost } = useContext(AppContext);
    const { darkMode } = useContext(AppContext);
    const openCreatePostModal = () => {
        setIsVisibleCreatePost(true);
        console.log('hhh');
    };
    const icon = <FontAwesomeIcon icon={faPlus} />;
    return (
        <div className={darkMode ? 'dark-mode' : 'light-mode'}>
            <Row>
                <Col span={24}>
                    <Header />
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    {' '}
                    <Left />
                </Col>
                <Col span={12}>
                    <Center />
                </Col>
                <Col span={6}>
                    <Right />
                </Col>
            </Row>
            <FloatButton type="primary" tooltip={<div>Thêm bài viết</div>} onClick={openCreatePostModal} icon={icon} />
        </div>
    );
};

export default Home;
