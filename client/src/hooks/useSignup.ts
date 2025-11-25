// File: client/src/hooks/useSignup.ts
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
// Assuming you have an Auth Zustand store (we'll create this next)
import useAuthStore from "../zustand/useAuthStore.ts"; 

// Interface matching the signup form inputs
interface SignupInputs {
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
    gender: string;
}

// Simple client-side input validation function
function handleInputErrors({ fullName, username, password, confirmPassword, gender }: SignupInputs) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    // 💡 Get the function to set the authenticated user from the store
    const { setAuthUser } = useAuthStore(); 

    const signup = async (inputs: SignupInputs) => {
        const success = handleInputErrors(inputs);
        if (!success) return;

        setLoading(true);
        try {
            // Send signup data to the backend API
            const response = await axios.post("http://localhost:5000/api/auth/signup", inputs);

            const data = response.data;

            if (data.error) {
                throw new Error(data.error);
            }

            // 1. Update local storage with the user data
            localStorage.setItem("quickchat-user", JSON.stringify(data));
            
            // 2. Update the global state
            setAuthUser(data); 

            toast.success("Signup successful!");

        } catch (error) {
            let errorMessage = "Signup failed.";
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

    return { loading, signup };
};

export default useSignup;