// File: client/src/hooks/useGetConversations.ts

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAuthStore from "../zustand/useAuthStore.ts"; 
// 🔑 Import the necessary User type and setter function from the store
import useConversation, { type User } from "../zustand/useConversation.ts"; 

const useGetConversations = () => {
    // 1. Local state for loading status
    const [loading, setLoading] = useState(false);
    
    // 2. Global state and setters
    const { conversations, setConversations } = useConversation(); 
    const { authUser } = useAuthStore(); 

    useEffect(() => {
        const getConversations = async () => {
            if (!authUser?._id) return; // Must have a logged-in user to filter

            setLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/api/users", { withCredentials: true });
                
                // 🔑 CRITICAL FIX: Ensure 'data' is treated as an array of the correct type
                let data: User[] = response.data as User[]; 

                if (response.status !== 200) {
                     // Check for common non-200 status errors
                     throw new Error("Received non-200 status code.");
                }

                // 🔑 FIX: Filter out the currently logged-in user using the correct User type
                const filteredConversations = data.filter(
                    // TypeScript fix (no 'any', explicit User type used)
                    (user: User) => user._id.toString() !== authUser._id.toString()
                );
                
                // Update the global state
                setConversations(filteredConversations);

            } catch (error) {
                // The API call failed (e.g., network error, 401 Unauthorized, etc.)
                toast.error("Error: Failed to fetch users."); 
                console.error("Fetch Users Error:", error);
            } finally {
                setLoading(false);
            }
        };

        // Call the fetch function only if a user is logged in
        getConversations();
    // Dependency array: Only re-run if the user ID or the setter changes
    }, [authUser?._id, setConversations]); 

    // Return the state from the global store
    return { loading, conversations };
};

export default useGetConversations;