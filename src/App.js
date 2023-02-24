import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';

import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';
import './App.css';

import { privateRoutes, publicRoutes } from './routes/routes';

import MainLayout from './Layouts/MainLayout';
import AppProvider from './contexts/AppContext';

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
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    return <Route key={index} path={route.path} element={<Page />} />;
                })}

                {privateRoutes.map((route, index) => {
                    const Page = route.component;

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <ProtectedRoute>
                                    <AppProvider>
                                        <MainLayout>
                                            <Page />
                                        </MainLayout>
                                    </AppProvider>
                                </ProtectedRoute>
                            }
                        />
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
