import React from 'react';
import './Center.scss';
import PostList from '../PostList/PostList';
import PostShare from '../PostShare/PostShare';

const Center = () => {
    return (
        <div className="center-container">
            <PostShare />
            <PostList />
        </div>
    );
};

export default Center;
