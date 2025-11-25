// File: client/src/zustand/useConversation.ts

import { create } from "zustand";

export interface User {
    _id: string;         // Frontend only needs string
    fullName: string;
    profilePic: string;
    username: string;
    isOnline?: boolean;
}

interface ConversationState {
    selectedConversation: User | null;
    setSelectedConversation: (selectedConversation: User | null) => void;

    messages: any[];
    setMessages: (messages: any[]) => void;

    conversations: User[];
    setConversations: (conversations: User[]) => void;

    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const useConversation = create<ConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

    messages: [],
    setMessages: (messages) => set({ messages }),

    conversations: [],
    setConversations: (conversations) => set({ conversations }),

    searchTerm: "",
    setSearchTerm: (term) => set({ searchTerm: term }),
}));

export default useConversation;
