import React, { useContext, useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import { AuthContext } from './AuthContext';

export const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const [openPost, setOpenPost] = useState();
    const [isVisibleCreatePost, setIsVisibleCreatePost] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [openProfileOwner, setOpenProfileOwner] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [user, setUser] = useState('');

    const userImplCodition = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: '==',
            compareValue: currentUser.uid,
        };
    }, [currentUser.uid]);

    const userImpl = useFirestore('users', userImplCodition);

    const followingCondition = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: userImpl[0]?.following,
        };
    }, [userImpl]);

    const following = useFirestore('users', followingCondition);

    const followsCondition = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: userImpl[0]?.follows,
        };
    }, [userImpl]);

    const followers = useFirestore('users', followsCondition);

    const userProfileCondition = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: '==',
            compareValue: userInfo.uid,
        };
    }, [userInfo.uid]);

    const userProfile = useFirestore('users', userProfileCondition);

    const postsCondition = React.useMemo(() => {
        return {
            fieldName: 'creatorId',
            operator: '==',
            compareValue: userInfo.uid,
        };
    }, [userInfo.uid]);

    const posts = useFirestore('posts', postsCondition);

    return (
        <AppContext.Provider
            value={{
                openPost,
                setOpenPost,
                isVisibleCreatePost,
                setIsVisibleCreatePost,
                darkMode,
                setDarkMode,
                openProfile,
                setOpenProfile,
                userImpl,
                followers,
                following,
                userInfo,
                userProfile,
                setUserInfo,
                openProfileOwner,
                setOpenProfileOwner,
                user,
                setUser,
                posts,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
