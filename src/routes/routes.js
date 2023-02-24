import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ChatWindow from '../pages/ChatWindow/ChatWindow';
import Explore from '../pages/Explore/Explore';
import Home from '../pages/Home/Home';
import Inbox from '../pages/Inbox/Inbox';
import Profile from '../pages/Profile/Profile';
import ProfileOwner from '../pages/Profile/ProfileOwner';
import Watch from '../pages/Watch/Watch';

const publicRoutes = [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/register',
        component: Register,
    },
];

const privateRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/myprofile',
        component: Profile,
    },
    {
        path: '/profile/:userId',
        component: ProfileOwner,
    },
    {
        path: '/watch',
        component: Watch,
    },
    {
        path: '/explore',
        component: Explore,
    },
    {
        path: '/inbox',
        component: Inbox,
    },
    {
        path: '/inbox/:inboxId',
        component: ChatWindow,
    },
];

export { publicRoutes, privateRoutes };
