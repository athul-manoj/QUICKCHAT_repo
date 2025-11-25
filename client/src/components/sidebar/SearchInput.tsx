// File: client/src/components/sidebar/SearchInput.tsx

import { useState } from 'react';
import { FaSearch } from "react-icons/fa"; 
import useConversation from "../../zustand/useConversation.ts"; 

const SearchInput = () => {
    const [search, setSearch] = useState('');
    const { setSearchTerm } = useConversation(); 
    
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Update the global search term when the form is submitted
        setSearchTerm(search); 
    };

    return (
        <form onSubmit={handleSearch} className='flex items-center gap-2'>
            {/* 🔑 FIX for autofill warning: Add id/name attributes */}
            <input
                type='text'
                id='userSearch'
                name='userSearch'
                placeholder='Search users...'
                className='input input-bordered rounded-full w-full'
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    // Live filtering: Update the global state immediately on change
                    setSearchTerm(e.target.value); 
                }}
            />
            <button type='submit' className='btn btn-circle bg-sky-500 text-white hover:bg-sky-600'>
                <FaSearch className='w-5 h-5 outline-none' />
            </button>
        </form>
    );
};

export default SearchInput;