// File: client/src/zustand/useConversation.ts

import { create } from "zustand";

export interface User {
    _id: string;         // Frontend only needs string
    fullName: string;
    profilePic: string;
    username: string;
    isOnline?: boolean;
}

export type MessageType = {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
};

interface ConversationState {
  selectedConversation: User | null;
  setSelectedConversation: (c: User | null) => void;

  messages: MessageType[];        // ← real type
  setMessages: (m: MessageType[]) => void;
  addMessage: (m: MessageType) => void;   // ← missing member

  conversations: User[];
  setConversations: (u: User[]) => void;

  searchTerm: string;
  setSearchTerm: (t: string) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (c) => set({ selectedConversation: c }),

  messages: [],
  setMessages: (m) => set({ messages: m }),
  addMessage: (m) => set((state) => ({ messages: [...state.messages, m] })), // ← ADD

  conversations: [],
  setConversations: (c) => set({ conversations: c }),

  searchTerm: "",
  setSearchTerm: (t) => set({ searchTerm: t }),
}));

export default useConversation;
