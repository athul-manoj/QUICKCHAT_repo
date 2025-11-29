import type { MessageType } from "../../zustand/useConversation";
import useAuthStore from "../../zustand/useAuthStore";

const Message = ({ msg }: { msg: MessageType }) => {
  const { authUser } = useAuthStore();
  const isOwn = msg.senderId === authUser?._id;
  return (
    <div className={`flex mb-2 ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
          isOwn ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {msg.message}
      </div>
    </div>
  );
};
export default Message;