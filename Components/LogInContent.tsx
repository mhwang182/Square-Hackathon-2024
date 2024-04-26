import { useState } from "react";

interface ILoginContentProps {
    isSignUp: boolean,
    createUser: (email: string, password: string) => void,
    onToggle: () => void,
    loginUser: (email: string, password: string) => void
}
const LogInContent = (props: ILoginContentProps) => {
    
    const { isSignUp, createUser, onToggle, loginUser} = props;

    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    const onButtonClick = async () => {
        if(isSignUp) {
            await createUser(inputEmail, inputPassword);
            return;
        }
        await loginUser(inputEmail, inputPassword);
        return;
    }
    
    return (
        <>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div className="mt-2">
                        <input name="email" type="email" required 
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    setInputEmail(e.currentTarget.value)
                                }}
                                value={inputEmail}
                                
                        />
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <div className="mt-2">
                        <input id="password" name="password" type="password" required 
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                setInputPassword(e.currentTarget.value)
                            }}
                            value={inputPassword}
                        />
                    </div>
                </div>
                <div>
                    <button 
                        type="submit" 
                        className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        onClick={onButtonClick}
                    >
                        {isSignUp ? 'Sign Up' : 'Log In'}
                    </button>
                </div>
            </div>

            <p className="mt-5 text-center text-sm text-gray-500">
                <a 
                    onClick={onToggle}
                    className="font-semibold leading-6 text-blue-600 hover:text-blue-500 cursor-pointer"
                >
                    {isSignUp ? "Log In" : "Sign Up"}
                </a>
            </p>
        </>
    )
}

export default LogInContent