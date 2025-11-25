// File: client/src/components/sidebar/Sidebar.tsx
import SearchInput from "./SearchInput.tsx";
import Conversations from "./Conversations.tsx";
// 💡 Import the logout hook
import useLogout from "../../hooks/useLogout.ts"; 
// 💡 Import the logout icon
import { BiLogOut } from "react-icons/bi"; 

const Sidebar = () => {
    // 💡 Get loading and logout function
    const { loading, logout } = useLogout();

    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            
            {/* 1. Search Bar */}
            <SearchInput />
            <div className='divider px-3'></div>
            
            {/* 2. Conversation List */}
            <Conversations />

            {/* 3. Logout Button (New Footer/Action Area) */}
            <div className='mt-auto'>
                <button
                    className='btn btn-sm btn-ghost'
                    onClick={logout}
                    disabled={loading}
                >
                    {loading ? (
                        <span className='loading loading-spinner'></span>
                    ) : (
                        <BiLogOut className='w-6 h-6 text-white cursor-pointer' />
                    )}
                </button>
            </div>
        </div>
    );
};
export default Sidebar;