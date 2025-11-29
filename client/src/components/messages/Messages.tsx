import { useEffect, useRef } from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import Message from "./Message";

const Messages = () => {
  const { messages, addMessage, selectedConversation } = useConversation();
  const { socket } = useSocketContext();
  const lastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socket) return;
    const handler = (msg: any) => {
      if (
        msg.senderId === selectedConversation?._id ||
        msg.receiverId === selectedConversation?._id
      )
        addMessage(msg);
    };
    socket.on("newMessage", handler);
    return () => void socket.off("newMessage", handler);
  }, [socket, selectedConversation, addMessage]);

  useEffect(() => {
    lastRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages.map((msg) => (
        <Message key={msg._id} msg={msg} />
      ))}
      <div ref={lastRef} />
    </div>
  );
};
export default Messages;