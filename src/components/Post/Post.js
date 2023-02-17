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

const Post = ({ post }) => {
    const [userPost, setUserPost] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [likeList, setLikeList] = useState([]);
    const [isLike, setIsLike] = useState(false);
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

    const handleLike = async () => {
        setIsLike(!isLike);

        //   //save to local storage
        //   const rs = JSON.stringify(isLike)
        //  localStorage.setItem('like',rs)

        //    console.log("gia tri isLike",isLike)
        if (isLike === true) {
            await updateDoc(doc(db, 'posts', post.docId), {
                likes: [...post.likes, currentUser.uid],
            });
        } else {
            setLikeList(post.likes.filter((item) => item !== currentUser.uid));

            await updateDoc(doc(db, 'posts', post.docId), {
                likes: [...likeList],
            });
        }
    };
    return (
        <div className="center-content">
            <div className="center-content-heading">
                <div className="center-conent-heading-left">
                    <Avatar size={36} src={userPost.photoURL}></Avatar>
                    <div className="center-content-heading-wrap">
                        <h3 className="center-name">{userPost.displayName}</h3>
                        <ReactTimeAgo date={post.createAt} locale="vi" />
                    </div>
                </div>

                <FontAwesomeIcon className="content-icon" icon={faXmark} />
            </div>
            <p className="center-content-status">{post.status}</p>
            <img className="center-content-img" src={post.photoURL} alt="" />
            <div className="center-content-menu">
                <div className="center-content-menu-wrap">
                    {isLike ? (
                        <FontAwesomeIcon
                            style={{ color: '#000' }}
                            className="content-menu-icon"
                            icon={faHeart}
                            onClick={handleLike}
                        />
                    ) : (
                        <FontAwesomeIcon
                            style={{ color: 'red' }}
                            className="content-menu-icon"
                            icon={faHeart}
                            onClick={handleLike}
                        />
                    )}

                    <span>{`${post?.likes?.length} likes`}</span>
                </div>
            </div>
        </div>
    );
};

export default Post;
