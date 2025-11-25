// File: client/src/App.tsx
import { Toaster } from 'react-hot-toast';
import Sidebar from "./components/sidebar/Sidebar.tsx";
import MessageContainer from "./components/messages/MessageContainer.tsx"; 

function App() {
  return (
    // We render the chat layout directly here
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden 
                    bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        
        {/* 1. The Left Panel */}
        <Sidebar />
        
        {/* 2. The Right Panel */}
        <MessageContainer />
    </div>
  );
}

// We moved the Toaster component to a wrapper outside of App, or we can leave it here.
// Let's keep the Toaster here for simplicity in this file.
const AppWrapper = () => (
    <>
        <App />
        <Toaster />
    </>
);

export default AppWrapper;