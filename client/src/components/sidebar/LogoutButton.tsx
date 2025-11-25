import { BiLogOut } from "react-icons/bi"; 

const LogoutButton = () => {
    // Logout logic will go here
    const handleLogout = () => {
        console.log("Logout clicked");
        // API call to logout
    };
    
    return (
        <div className='mt-auto'>
            <BiLogOut 
                className='w-6 h-6 text-white cursor-pointer'
                onClick={handleLogout}
            />
        </div>
    );
};

export default LogoutButton;