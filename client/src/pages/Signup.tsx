// File: client/src/pages/Signup.tsx

import { useState } from "react";
import { Link } from "react-router-dom";
// Note: Ensure GenderCheckbox is imported with the correct extension (.tsx)
import GenderCheckbox from "../components/GenderCheckbox.tsx"; 
import useSignup from "../hooks/useSignup.ts";

const Signup = () => {
    // State for form inputs
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });

    // Get the core functionality from the hook
    const { loading, signup } = useSignup();

    const handleGenderChange = (gender: string) => {
        // Ensure only one gender is selected
        setInputs({ ...inputs, gender });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Call the signup function from the hook
        await signup(inputs);
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Signup <span className='text-blue-500'>QuickChat</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Full Name</span>
                        </label>
                        <input
                            type='text'
                            placeholder='John Doe'
                            className='w-full input input-bordered h-10'
                            value={inputs.fullName}
                            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label className='label p-2 '>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='johndoe'
                            className='w-full input input-bordered h-10'
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            className='w-full input input-bordered h-10'
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Confirm Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            className='w-full input input-bordered h-10'
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                        />
                    </div>
                    
                    {/* Gender Checkbox */}
                    <GenderCheckbox onGenderChange={handleGenderChange} selectedGender={inputs.gender} />

                    {/* Link to Login */}
                    <Link
                        to={"/login"}
                        className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'
                    >
                        Already have an account?
                    </Link>

                    {/* Submit Button */}
                    <div>
                        <button 
                            className='btn btn-block btn-sm mt-2 border border-slate-700'
                            disabled={loading}
                        >
                            {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Signup;