// File: client/src/hooks/useLogout.ts
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAuthStore from '../zustand/useAuthStore.ts';

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthStore(); // Function to clear user state

    const logout = async () => {
        setLoading(true);
        try {
            // Send request to backend to clear cookie
            const response = await axios.post("http://localhost:5000/api/auth/logout");

            if (response.status !== 200) {
                 throw new Error("Logout failed on server.");
            }

            // 1. Clear local storage
            localStorage.removeItem("quickchat-user");
            
            // 2. Clear global state, triggering UI update and redirection
            setAuthUser(null); 
            
            toast.success("Logged out successfully.");

        } catch (error) {
            let errorMessage = "Logout failed.";
            if (axios.isAxiosError(error) && error.response) {
                errorMessage = error.response.data.error || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout };
};

export default useLogout;