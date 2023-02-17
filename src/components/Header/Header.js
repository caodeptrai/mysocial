import React, { useContext } from 'react';
import Search from '../Search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { Popover, Avatar, Tooltip } from 'antd';
import './Header.scss';
import { AuthContext } from '../../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { AppContext } from '../../contexts/AppContext';

const Header = () => {
    const { currentUser } = useContext(AuthContext);
    const { darkMode, setDarkMode, setOpenProfile, setOpenProfileOwner, setUserInfo } = useContext(AppContext);

    const profileVisible = () => {
        setUserInfo(currentUser);
        setOpenProfile(true);
        setOpenProfileOwner(false);
    };

    const reLoadPage = () => {
        setOpenProfile(false);
        setOpenProfileOwner(false);
    };
    const content = (
        <ul className="sub-content-profile">
            <li className="view-profile" onClick={profileVisible}>
                Xem trang cá nhân
            </li>
            <li className="btn-logout" onClick={() => signOut(auth)}>
                Đăng xuất
            </li>
        </ul>
    );
    return (
        <div className="header-container">
            <h1 className="header-logo" onClick={() => reLoadPage()}>
                Mysocial
            </h1>
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
    );
};

export default Header;
