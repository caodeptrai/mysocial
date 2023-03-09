import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';

import { BrowserRouter, Routes, Navigate, Route, Outlet } from 'react-router-dom';
import './App.css';
import MainLayout from './Layouts/MainLayout';
import AppProvider from './contexts/AppContext';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home/Home';
import ProfileOwner from './pages/Profile/ProfileOwner';
import Profile from './pages/Profile/Profile';
import Watch from './pages/Watch/Watch';
import Explore from './pages/Explore/Explore';
import Inbox from './pages/Inbox/Inbox';
import ChatWindow from './pages/ChatWindow/ChatWindow';

function App() {
    const { currentUser } = useContext(AuthContext);

    const PrivateRoute = ({ children }) => {
        return currentUser ? <Outlet /> : <Navigate to="/login" />;
    };

    const AppLayout = () => {
        return (
            <AppProvider>
                <Outlet />
            </AppProvider>
        );
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/" element={<AppLayout />}>
                        <Route path="/" element={<MainLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/myprofile" element={<Profile />} />
                            <Route path="/profile/:userId" element={<ProfileOwner />} />
                            <Route path="/watch" element={<Watch />} />
                            <Route path="/explore" element={<Explore />} />
                            <Route path="/inbox" element={<Inbox />}>
                                <Route path="/inbox/:inboxId" element={<ChatWindow />} />
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
