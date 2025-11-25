// File: client/src/components/messages/Messages.tsx
import useConversation from "../../zustand/useConversation.ts";
import Message from "./Message.tsx"; // Import the individual bubble component

const Messages = () => {
    // 💡 1. Get messages from the global state
    const { messages } = useConversation();
    
  
    
  return (
        <div className='px-4 flex-1 overflow-auto'>
            {messages.map((message) => ( // 💡 USE 'messages' HERE
                <div key={message.id}>
                    <Message message={message} />
                </div>
            ))}
            {/* You won't see any messages yet, but the structure is correct */}
        </div>
    );
};

export default Messages;