// File: client/src/hooks/useSendMessage.ts

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation.ts";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    // Get the current messages and the selected recipient from the global store
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message: string) => {
        setLoading(true);
        // Ensure a recipient is selected
        if (!selectedConversation) {
            setLoading(false);
            return toast.error("Please select a user to start messaging.");
        }
        
        try {
            // API call to the backend send message route
            const response = await axios.post(
                `http://localhost:5000/api/messages/send/${selectedConversation._id}`, 
                { message: message }, // Send the message payload
                { withCredentials: true }
            );

            const data = response.data;

            // 💡 Update the local state with the new message
            setMessages([...messages, data]); 

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.error || "Failed to send message.");
            } else {
                toast.error("Failed to send message.");
            }
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};
export default useSendMessage;