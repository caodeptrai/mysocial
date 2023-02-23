import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';
import { faFilm, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = () => {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };
    return (
        <div className="sidebar">
            <div className="sidebar-container">
                <ul className="content">
                    <Link
                        className={toggleState === 1 ? 'link item active' : 'link item'}
                        to="/"
                        onClick={() => toggleTab(1)}
                    >
                        <FontAwesomeIcon className="icon" icon={faHouse} />
                        <span className="title">Home</span>
                    </Link>

                    <Link
                        className={toggleState === 2 ? 'link item active' : 'link item'}
                        to="/explore"
                        onClick={() => toggleTab(2)}
                    >
                        {toggleState === 2 ? (
                            <i className="icon fa-solid fa-compass"></i>
                        ) : (
                            <i className="icon fa-regular fa-compass"></i>
                        )}

                        <span className="title">Discover</span>
                    </Link>
                    <li className={toggleState === 3 ? ' item active' : ' item'} onClick={() => toggleTab(3)}>
                        <FontAwesomeIcon className="icon" icon={faFilm} />

                        <span className="title">Reels</span>
                    </li>
                    <Link
                        className={toggleState === 4 ? 'link item active' : 'link item'}
                        to="./inbox"
                        onClick={() => toggleTab(4)}
                    >
                        {toggleState === 4 ? (
                            <i className="icon fa-brands fa-facebook-messenger"></i>
                        ) : (
                            <svg
                                aria-label="Messenger"
                                color="rgb(38, 38, 38)"
                                fill="rgb(38, 38, 38)"
                                height="22"
                                role="img"
                                viewBox="0 0 24 24"
                                width="22"
                            >
                                <path
                                    d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-miterlimit="10"
                                    stroke-width="1.739"
                                ></path>
                                <path
                                    d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z"
                                    fill-rule="evenodd"
                                ></path>
                            </svg>
                        )}
                        <span className="title">Message</span>
                    </Link>
                </ul>
                <div className={toggleState === 5 ? ' item active' : ' item'} onClick={() => toggleTab(5)}>
                    <i className="icon fa-solid fa-bars"></i>
                    <span className="title">See more</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
