import React, { useContext } from 'react';
import Search from '../Search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Popover, Avatar, Tooltip } from 'antd';
import './Header.scss';
import { AuthContext } from '../../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

import { Link } from 'react-router-dom';

import DarkMode from '../DarkMode/DarkMode';

const Header = () => {
    const { currentUser } = useContext(AuthContext);
    const content = (
        <div className="sub-content-profile">
            <Link to="/myprofile" className="view-profile">
                Xem trang cá nhân
            </Link>
            <div className="btn-logout" onClick={() => signOut(auth)}>
                Đăng xuất
            </div>
        </div>
    );

    return (
        <div className="header">
            <div className="header-container">
                <Link to="/" className="header-logo">
                    Mysocial
                </Link>

                <div className="search-container">
                    <Search />
                </div>
                <div className="header-menu">
                    <div className="dark-mode-container">
                        <DarkMode />
                    </div>

                    <div className="header-notify">
                        <Tooltip placement="bottom" title="Thông báo">
                            <FontAwesomeIcon className="header-icon" icon={faBell} />
                        </Tooltip>
                    </div>
                    <Popover placement="bottomRight" content={content} trigger="click">
                        <Avatar className="header-avatar" size={36} src={currentUser.photoURL}></Avatar>
                    </Popover>
                </div>
            </div>
        </div>
    );
};

export default Header;
