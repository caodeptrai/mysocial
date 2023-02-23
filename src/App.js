import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import Home from './pages/Home/Home';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Inbox from './pages/Inbox/Inbox';
import Profile from './pages/Profile/Profile';
import Watch from './pages/Watch/Watch';
import Error from './pages/Error/Error';
import ProfileOwner from './pages/Profile/ProfileOwner';
import ChatWindow from './pages/ChatWindow/ChatWindow';
import './App.css';
import Explore from './pages/Explore/Explore';
import { AppLayout, AuthLayout, ChatLayout, Layout } from './Layouts';

function App() {
    const { currentUser } = useContext(AuthContext);

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />;
        }

        return <Outlet />;
    };

    const router = createBrowserRouter([
        {
            element: <AuthLayout />,
            errorElement: <Error />,
            children: [
                {
                    path: '/login',
                    element: <Login />,
                },
                {
                    path: '/register',
                    element: <Register />,
                },
                {
                    element: <ProtectedRoute />,
                    children: [
                        {
                            element: <AppLayout />,
                            children: [
                                {
                                    element: <ChatLayout />,
                                    children: [
                                        {
                                            element: <Layout />,
                                            children: [
                                                {
                                                    path: '/',
                                                    element: <Home />,
                                                },
                                                {
                                                    path: '/profile',
                                                    element: <Profile />,
                                                },
                                                {
                                                    path: `/profile/:userId`,
                                                    element: <ProfileOwner />,
                                                },
                                                {
                                                    path: '/watch',
                                                    element: <Watch />,
                                                },
                                                {
                                                    path: '/explore',
                                                    element: <Explore />,
                                                },
                                                {
                                                    path: '/inbox',
                                                    element: <Inbox />,
                                                    children: [
                                                        {
                                                            path: `/inbox/:inboxId`,
                                                            element: <ChatWindow />,
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
