import React, { useContext } from 'react';
import Search from '../Search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { Popover, Avatar, Tooltip } from 'antd';
import './Header.scss';
import { AuthContext } from '../../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

import { Link } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

const Header = () => {
    const { currentUser } = useContext(AuthContext);
    const { darkMode, setDarkMode } = useContext(AppContext);
    const content = (
        <div className="sub-content-profile">
            <Link to="/profile" className="view-profile">
                Xem trang cá nhân
            </Link>
            <div className="btn-logout" onClick={() => signOut(auth)}>
                Đăng xuất
            </div>
        </div>
    );

    return (
        <div className={darkMode ? 'header header-dark' : 'header header-light'}>
            <div className="header-container">
                <Link to="/" className="header-logo">
                    Mysocial
                </Link>

                <div className="search-container">
                    <Search />
                </div>
                <div className="header-menu">
                    <div className="dark-mode-container">
                        <FontAwesomeIcon icon={faSun} style={{ color: darkMode ? 'grey' : 'yellow', fontSize: 24 }} />

                        <div className="switch-checkbox">
                            <label className="switch">
                                <input type="checkbox" onChange={() => setDarkMode(!darkMode)} />
                                <span className="slider round"> </span>
                            </label>
                        </div>
                        <FontAwesomeIcon icon={faMoon} style={{ color: darkMode ? '#c96dfd' : 'grey', fontSize: 24 }} />
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
