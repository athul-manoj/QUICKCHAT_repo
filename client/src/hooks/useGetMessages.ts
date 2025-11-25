// File: client/src/hooks/useGetMessages.ts

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation.ts";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    // Get the setter for messages and the currently selected user from the store
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            // Only proceed if a conversation is selected
            if (!selectedConversation?._id) return;
            
            setLoading(true);
            setMessages([]); // Clear previous messages while loading

            try {
                // API call to the backend route to fetch messages for the selected user
                const response = await axios.get(
                    `http://localhost:5000/api/messages/${selectedConversation._id}`, 
                    { withCredentials: true }
                );

                const data = response.data;
                setMessages(data); // Set the fetched messages to the global state

            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    toast.error(error.response.data.error || "Failed to fetch messages.");
                } else {
                    toast.error("Failed to fetch messages.");
                }
            } finally {
                setLoading(false);
            }
        };

        // Call the function whenever selectedConversation changes
        getMessages();
    }, [selectedConversation?._id, setMessages]); // Dependencies to re-run the effect

    return { messages, loading };
};
export default useGetMessages;