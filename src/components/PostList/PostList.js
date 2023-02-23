import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase/config';
import './PostList.scss';
import Post from '../Post/Post';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'posts'));

        const unsubscribe = onSnapshot(q, (doc) => {
            const postdata = [];
            let res = {};
            doc.forEach((doc) => {
                res = {
                    docId: doc.id,
                    ...doc.data(),
                };
                postdata.push(res);
            });
            setPosts(postdata);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="center-container">
            {posts
                ?.sort((a, b) => b.createAt - a.createAt)
                .map((item) => (
                    <Post post={item} key={item.id} />
                ))}
        </div>
    );
};

export default PostList;
