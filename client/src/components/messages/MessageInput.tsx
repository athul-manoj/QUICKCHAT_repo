import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation();

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !socket || !selectedConversation) return;
    socket.emit("sendMessage", { receiverId: selectedConversation._id, message: text });
    setText("");
  };

  return (
    <form onSubmit={sendMessage} className="px-4 my-3">
      <div className="w-full relative">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border rounded-lg block w-full p-2.5 bg-gray-700 text-white"
          placeholder="Send a message"
        />
        <button className="absolute inset-y-0 end-0 flex items-center pe-3">Send</button>
      </div>
    </form>
  );
};
export default MessageInput;