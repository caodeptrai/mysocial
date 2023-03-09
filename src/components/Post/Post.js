import React, { useContext, useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faXmark } from '@fortawesome/free-solid-svg-icons';
import './Post.scss';
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import vi from 'javascript-time-ago/locale/vi';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

const Post = ({ post }) => {
    const [userPost, setUserPost] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { setUserInfo } = useContext(AppContext);
    const [liked, setLiked] = useState(false);
    TimeAgo.addLocale(vi);
    useEffect(() => {
        const q = query(collection(db, 'users'), where('uid', '==', post.creatorId));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setUserPost(doc.data());
            });
        });

        return () => {
            unsubscribe();
        };
    }, [post]);

    useEffect(() => {
        const checkLiked = post.likes.includes(currentUser?.uid);
        setLiked(checkLiked);
    }, [currentUser.uid, post.likes]);

    const handleLike = async () => {
        console.log('click');
        if (liked) {
            const unlike = post.likes.filter((item) => item !== currentUser?.uid);

            await updateDoc(doc(db, 'posts', post.docId), {
                likes: [...unlike],
            });
        } else {
            await updateDoc(doc(db, 'posts', post.docId), {
                likes: [...post.likes, currentUser.uid],
            });
        }
    };
    return (
        <div className="center-content">
            <div className="center-content-heading">
                <Link
                    to={`/profile/${userPost.displayName}`}
                    className="center-conent-heading-left"
                    onClick={() => setUserInfo(userPost)}
                >
                    <Avatar size={36} src={userPost.photoURL}></Avatar>
                    <div className="center-content-heading-wrap">
                        <h3 className="center-name">{userPost.displayName}</h3>
                        <ReactTimeAgo date={post.createAt} locale="vi" />
                    </div>
                </Link>

                <FontAwesomeIcon className="content-icon" icon={faXmark} />
            </div>
            <p className="center-content-status">{post.status}</p>
            <img className="center-content-img" src={post.photoURL} alt="" />
            <div className="center-content-menu">
                <div className="center-content-menu-wrap">
                    {liked ? (
                        <FontAwesomeIcon
                            style={{ color: 'red' }}
                            className="content-menu-icon"
                            icon={faHeart}
                            onClick={() => {
                                handleLike();
                            }}
                        />
                    ) : (
                        <FontAwesomeIcon
                            className="content-menu-icon"
                            icon={faHeart}
                            onClick={(e) => {
                                handleLike();
                            }}
                        />
                    )}

                    <span>{`${post?.likes?.length} likes`}</span>
                </div>
            </div>
        </div>
    );
};

export default Post;
