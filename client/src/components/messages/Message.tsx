// File: client/src/components/messages/Message.tsx

// 1. Define the MessageType (what a message object looks like)
interface MessageType {
    id: number;
    message: string;
    senderId: number; 
    timestamp: string;
}

// 2. Define the props the component accepts (MUST accept the 'message' prop)
interface MessageProps {
    message: MessageType; // This tells TypeScript the component expects a prop named 'message'
}

// 3. Apply the interface to the component function
const Message = ({ message }: MessageProps) => {
    // 💡 Placeholder: Determine if this message was sent by the logged-in user (ID 1 for our mock)
    const fromMe = message.senderId === 1; // Assuming logged-in user has ID 1
    
    // Tailwind/DaisyUI classes for dynamic styling
    const chatBubbleClass = fromMe ? 'chat-end' : 'chat-start';
    const bubbleColor = fromMe ? 'bg-blue-500' : 'bg-gray-700 text-white';

    return (
        <div className={`chat ${chatBubbleClass}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='User Avatar' src={'https://avatar.iran.liara.run/public/boy?username=' + message.senderId} />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleColor}`}>
                {message.message}
            </div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
                {message.timestamp}
            </div>
        </div>
    );
};

export default Message;