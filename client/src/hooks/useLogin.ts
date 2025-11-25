// File: client/src/hooks/useLogin.ts

import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useAuthStore from "../zustand/useAuthStore.ts"; 

interface LoginInputs {
    username: string;
    password: string;
}

// Simple client-side input validation
function handleInputErrors({ username, password }: LoginInputs): boolean {
    if (!username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }
    return true;
}

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    // Get the function to set the authenticated user from the store
    const { setAuthUser } = useAuthStore();

    const login = async (inputs: LoginInputs) => {
        const success = handleInputErrors(inputs);
        if (!success) return;

        setLoading(true);
        try {
            // Send login data to the backend API
            const response = await axios.post("http://localhost:5000/api/auth/login", inputs);
            
            const data = response.data;

            if (data.error) {
                throw new Error(data.error);
            }

            // 1. Update local storage with the user data
            localStorage.setItem("quickchat-user", JSON.stringify(data));
            
            // 2. Update the global state
            setAuthUser(data); 

            toast.success(`Welcome back, ${data.fullName}!`);

        } catch (error) {
            let errorMessage = "Login failed.";
            if (axios.isAxiosError(error) && error.response) {
                // If the backend returns an error message (e.g., "Invalid username or password")
                errorMessage = error.response.data.error || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;