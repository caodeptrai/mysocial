import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ChatContextProvider } from './contexts/ChatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <ChatContextProvider>
                <App />
            </ChatContextProvider>
        </AuthContextProvider>
    </React.StrictMode>,
);
