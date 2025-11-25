// File: client/src/components/messages/MessageInput.tsx

import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage.ts"; // 💡 NEW IMPORT

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const { sendMessage, loading } = useSendMessage(); // 💡 Use the new hook

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message) return; // Don't send empty messages

        await sendMessage(message);
        setMessage(""); // Clear the input field
    };

    return (
        <form className='px-4 my-3' onSubmit={handleSubmit}>
            <div className='w-full relative'>
                <input
                    type='text'
                    className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
                    placeholder='Send a message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3' disabled={loading}>
                    {/* 💡 Show spinner if loading */}
                    {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
                </button>
            </div>
        </form>
    );
};
export default MessageInput;