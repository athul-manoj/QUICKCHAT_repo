// File: client/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// 💡 Add Navigate for redirection
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
// 💡 Import the Auth store to check login status
import useAuthStore from './zustand/useAuthStore.ts'; 

// Component to handle route rendering logic
const RootApp = () => {
    // 💡 Get the user object from the global store
    const { authUser } = useAuthStore(); 

    return (
        <Routes>
            {/* 1. Main Chat Route (Protected) */}
            <Route 
                path='/' 
                element={authUser ? <App /> : <Navigate to="/login" />} 
            />
            
            {/* 2. Login Route (Redirects authenticated users to chat) */}
            <Route 
                path='/login' 
                element={authUser ? <Navigate to="/" /> : <Login />} 
            />

            {/* 3. Signup Route (Redirects authenticated users to chat) */}
            <Route 
                path='/signup' 
                element={authUser ? <Navigate to="/" /> : <Signup />} 
            />
        </Routes>
    );
}

// 💡 The main render function now wraps the logic in the BrowserRouter
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <RootApp />
        </BrowserRouter>
    </React.StrictMode>,
);