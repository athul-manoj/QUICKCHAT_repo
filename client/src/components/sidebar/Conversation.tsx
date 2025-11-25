import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx }: any) => {
    const { setSelectedConversation, selectedConversation } = useConversation();

    return (
        <div
            onClick={() => setSelectedConversation(conversation)}
            className={`flex gap-2 items-center hover:bg-gray-700 rounded p-2 cursor-pointer
                ${selectedConversation?._id === conversation._id ? "bg-gray-700" : ""}`}>
            <img src={conversation.profilePic} className="w-12 h-12 rounded-full" />

            <p className="text-white font-medium">{conversation.fullName}</p>

            {lastIdx && <hr className="border-gray-600 mt-2" />}
        </div>
    );
};

export default Conversation;
