import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import Post from '../../components/Post/Post';
import { AppContext } from '../../contexts/AppContext';

import './Profile.scss';
const Profile = () => {
    const { userImpl, myPosts } = useContext(AppContext);

    return (
        <div>
            <div className="pro">
                <div className="pro-background">
                    <div className="pro-info pro-info-no">
                        <div className="rightAvatarWrap">
                            <img className="rightAvatar" src={userImpl[0]?.photoURL} alt="" />
                            <button className="updateAvatarBtn">
                                <FontAwesomeIcon icon={faCamera} />
                            </button>
                        </div>

                        <div className="info">
                            <h3 className="info-name">{userImpl[0]?.displayName}</h3>
                        </div>
                    </div>
                </div>
                <div className="pro-content">
                    <h3 className="introduce">Giới thiệu</h3>

                    <div className="pro-content-pra">
                        <div className="pro-content-pra-item separe">
                            <span className="pro-pra-quantity">{userImpl[0]?.follows?.length}</span>
                            <span>Người theo dõi</span>
                        </div>
                        <div className="pro-content-pra-item separe">
                            <span className="pro-pra-quantity">{userImpl[0]?.following?.length}</span>
                            <span>Đang theo dõi</span>
                        </div>
                        <div className="pro-content-pra-item">
                            <span className="pro-pra-quantity">{myPosts?.length}</span>
                            <span>Bài viết</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="posts-content">
                <div className="posts-wrap">
                    {myPosts.map((item) => (
                        <Post post={item} key={item.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
