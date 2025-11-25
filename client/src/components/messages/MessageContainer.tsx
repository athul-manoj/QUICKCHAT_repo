// File: client/src/components/messages/MessageContainer.tsx

import useConversation from "../../zustand/useConversation.ts";
import useAuthStore from "../../zustand/useAuthStore.ts"; 
import MessageInput from "./MessageInput.tsx";
import { TiMessages } from "react-icons/ti";
import useGetMessages from "../../hooks/useGetMessages.ts";
import Message from "./Message.tsx"; // 🔑 FIX: Assuming your individual message component is named 'Message' (Uppercase M)

const MessageContainer = () => {
    // 1. Access the selected conversation state
    const { selectedConversation, setSelectedConversation } = useConversation();
    
    // 2. Access the authenticated user data
    const { authUser } = useAuthStore();
    
    // 3. Get messages for the selected user
    const { messages, loading } = useGetMessages();

    // 4. Derive the current user's name
    const currentUserName = authUser?.fullName || "User"; 

    // 💡 Logic to reset selectedConversation on unmount (cleanup)
    // useEffect(() => {
    //     return () => setSelectedConversation(null);
    // }, [setSelectedConversation]);

    // 5. Render either the chat window or the welcome screen
    return (
        <div className='flex flex-col flex-1'>
            {!selectedConversation ? (
                // Renders the welcome screen if no user is selected
                <NoChatSelected currentUserName={currentUserName} />
            ) : (
                // Renders the chat window if a user IS selected
                <>
                    {/* Header displaying selected user */}
                    <div className='bg-slate-500 px-4 py-2 mb-2'>
                        <span className='label-text'>To:</span>{" "}
                        <span className='text-gray-900 font-bold'>
                            {selectedConversation?.fullName || 'User'}
                        </span>
                    </div>

                    {/* Message List Area */}
                    {/* Note: If you have a separate component named 'Messages.tsx' (plural), 
                       you should use that wrapper component here instead of a simple div. */}
                    <div className='px-4 flex-1 overflow-auto'>
                        {loading && <div className="loading loading-spinner mx-auto"></div>}
                        
                        {!loading && messages.length > 0 ? (
                            // 🔑 FIX: Use 'msg' consistently, and call the Message component (Uppercase M)
                            messages.map((msg) => (
                                <Message key={msg._id} message={msg} />
                            ))
                        ) : (
                            // Display this message when loaded but no messages exist
                            !loading && <p className='text-center'>Send a message to start the conversation</p>
                        )}
                    </div>
                    
                    {/* Message Input Area */}
                    <MessageInput />
                </>
            )}
        </div>
    );
};

export default MessageContainer;


// The "Welcome Screen" component
const NoChatSelected = ({ currentUserName }: { currentUserName: string }) => {
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 {currentUserName} ❄</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    );
};