import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../../zustand/useConversation";

const MessageContainer = () => {
  const { selectedConversation } = useConversation();
  return (
    <div className="flex flex-col flex-1">
      {selectedConversation ? (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To: </span>
            <span className="text-gray-900 font-bold">
              {selectedConversation.username}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-slate-400">Select a conversation</p>
        </div>
      )}
    </div>
  );
};
export default MessageContainer;