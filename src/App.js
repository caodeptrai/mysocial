import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import Home from './pages/Home/Home';
import CreatePostModal from './components/CreatePostModal/CreatePostModal';
import AppProvider from './contexts/AppContext';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

function App() {
    const { currentUser } = useContext(AuthContext);

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />;
        }

        return children;
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={
                            <ProtectedRoute>
                                <AppProvider>
                                    <Home />
                                    <CreatePostModal />
                                </AppProvider>
                            </ProtectedRoute>
                        }
                    ></Route>
                    <Route path="login" element={<Login />}></Route>
                    <Route path="register" element={<Register />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
