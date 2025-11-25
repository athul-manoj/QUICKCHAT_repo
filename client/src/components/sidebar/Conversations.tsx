// File: client/src/components/sidebar/Conversations.tsx

import Conversation from "./Conversation.tsx";
import useGetConversations from "../../hooks/useGetConversations.ts";
import useConversation, { type User } from "../../zustand/useConversation.ts";

const Conversations = () => {
    // Typed conversations from hook
    const { loading, conversations }: { loading: boolean; conversations: User[] } =
        useGetConversations();

    const { searchTerm } = useConversation();

    // Filter by search safely
    const filteredConversations = conversations.filter((c: User) =>
        c.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="py-2 flex flex-col overflow-auto">
            {filteredConversations.map((conversation, idx) => (
                <Conversation
                    key={conversation._id} // _id already string
                    conversation={conversation}
                    lastIdx={idx === filteredConversations.length - 1} isSelected={false} onClick={function (): void {
                        throw new Error("Function not implemented.");
                    } }                />
            ))}

            {loading && (
                <span className="loading loading-spinner mx-auto text-white"></span>
            )}

            {!loading && filteredConversations.length === 0 && (
                <p className="text-center text-gray-400 mt-4">
                    {searchTerm ? "No results found." : "No users to display."}
                </p>
            )}
        </div>
    );
};

export default Conversations;
