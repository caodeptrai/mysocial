import React, { useContext } from 'react';
import './Center.scss';
import { AppContext } from '../../contexts/AppContext';
import Profile from '../../pages/Profile/Profile';
import PostList from '../PostList/PostList';
import ProfileOwner from '../../pages/Profile/ProfileOwner';

const Center = () => {
    const { openProfile, openProfileOwner } = useContext(AppContext);

    return (
        <div className="center-container">
            {openProfileOwner || openProfile ? openProfileOwner ? <ProfileOwner /> : <Profile /> : <PostList />}
        </div>
    );
};

export default Center;
