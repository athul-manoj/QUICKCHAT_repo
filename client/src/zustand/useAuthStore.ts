// File: client/src/zustand/useAuthStore.ts
import { create } from 'zustand';

// Interface for the user object
interface AuthUser {
    _id: string;
    fullName: string;
    username: string;
    profilePic: string;
}

// Define the interface for the Auth Store state and actions
interface AuthStore {
    // State: user data, retrieved from local storage or null
    authUser: AuthUser | null;
    
    // Action: function to set the user state
    setAuthUser: (user: AuthUser | null) => void;
}

// Function to safely get the user from local storage
const getInitialAuthUser = (): AuthUser | null => {
    try {
        const userString = localStorage.getItem("quickchat-user");
        if (userString) {
            return JSON.parse(userString) as AuthUser;
        }
        return null;
    } catch (e) {
        console.error("Error parsing user from local storage", e);
        return null;
    }
};

const useAuthStore = create<AuthStore>((set) => ({
    // Initialize state from local storage (for persistence)
    authUser: getInitialAuthUser(), 
    
    // Set the state with new user data (login/signup/logout)
    setAuthUser: (user) => set({ authUser: user }),
}));

export default useAuthStore;