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
                    <Link
                        to="/watch"
                        className={toggleState === 3 ? 'link item active' : 'link item'}
                        onClick={() => toggleTab(3)}
                    >
                        <FontAwesomeIcon className="icon" icon={faFilm} />

                        <span className="title">Watch</span>
                    </Link>
                    <Link
                        className={toggleState === 4 ? 'link item active' : 'link item'}
                        to="./inbox"
                        onClick={() => toggleTab(4)}
                    >
                        <i className="icon fa-brands fa-facebook-messenger"></i>
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
