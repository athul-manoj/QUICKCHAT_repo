// File: client/src/pages/Login.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin.ts';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const { loading, login } = useLogin();

   const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // 💡 2. Call the login function from the hook
        await login({ username, password });
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Login
                    <span className='text-blue-500'> QuickChat</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    {/* Username Field */}
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter username'
                            className='w-full input input-bordered h-10'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            className='w-full input input-bordered h-10'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    {/* Link to Signup */}
                    <Link 
                        to='/signup' 
                        className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'
                    >
                        {"Don't"} have an account?
                    </Link>

                   {/* Submit Button */}
                    <div>
                        <button 
                            className='btn btn-block btn-sm mt-2 border border-slate-700'
                            type='submit'
                            disabled={loading} // 💡 Disabled by the 'loading' state
                        >
                            {loading ? <span className='loading loading-spinner'></span> : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;