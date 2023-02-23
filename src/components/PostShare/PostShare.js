import { uuidv4 as uuid } from '@firebase/util';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState, useRef } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { db, storage } from '../../firebase/config';
import './PostShare.scss';

const PostShare = () => {
    const { currentUser } = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const imageRef = useRef();
    const [status, setStatus] = useState('');

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setFile(img);
            setImage({
                image: URL.createObjectURL(img),
            });
        }
    };

    const handlePostShare = async () => {
        if (file) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (error) => {
                    //TODO:Handle Error
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await addDoc(collection(db, 'posts'), {
                            id: uuid(),
                            creatorId: currentUser.uid,
                            status: status,
                            photoURL: downloadURL,
                            likes: [],
                            createAt: Date.now(),
                        });
                    });
                },
            );
        } else {
            await addDoc(collection(db, 'posts'), {
                id: uuid(),
                creatorId: currentUser.uid,
                status: status,
                likes: [],
                createAt: Date.now(),
            });
        }
        setStatus('');
        setImage(null);
    };

    return (
        <div className="PostShare">
            <img src={currentUser.photoURL} alt="" />
            <div className="wrapper">
                <input
                    type="text"
                    placeholder="What's happening"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <div className="postOptions">
                    <div className="option" style={{ color: '#0CE400' }} onClick={() => imageRef.current.click()}>
                        <i className="fa-solid fa-image"></i>
                        Photo
                    </div>
                    <div className="option" style={{ color: '#FAB005' }}>
                        <i className="fa-solid fa-film"></i>
                        Video
                    </div>
                    <div className="option" style={{ color: '#E47A00' }}>
                        <i className="fa-solid fa-location-dot"></i>
                        Location
                    </div>
                    <button className="button ps-button" onClick={handlePostShare}>
                        Share
                    </button>
                    <div style={{ display: 'none' }}>
                        <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
                    </div>
                </div>
                {image && (
                    <div className="previewImage">
                        <FontAwesomeIcon icon={faXmark} onClick={() => setImage(null)} />
                        <img src={image.image} alt="" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostShare;
