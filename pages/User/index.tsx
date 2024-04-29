import { useContext, useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { Oval } from "react-loader-spinner";
import LogInContent from "../../Components/LogInContent";
import { useRouter } from 'next/router'
import { AuthContext } from "../../context/AuthContext";
import SpinnerOptionModal from "../../Components/SpinnerOptionModal";

const Registration = () => {

    const [isSignUp, setIsSignUp] = useState(false);
    const [squareAuthorizeLink, setSquareAuthorizeLink] = useState("");
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    const { 
        createUser, 
        isUserLoading, 
        userToken, 
        checkLogedIn,
        logout,
        getSquareAuthorizeLink,
        loginUser,
    } = useAppContext();

    const { checkAccessToken, getRouletteOptions } = useContext(AuthContext);

    const router = useRouter();

    useEffect(() => {
        checkLogedIn();
        if(userToken && userToken.length > 0){
            onAuthorizeSquare();
        }
        checkAccessToken();
        getRouletteOptions();
    }, [userToken])

    const onAuthorizeSquare = async () => {
        const link = await getSquareAuthorizeLink(userToken);
        setSquareAuthorizeLink(link);
    }

    const MyButton = (props: {text: string, onClick: () => void}) => {
        return (
            <button 
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={props.onClick}
            >
                {props.text}
            </button>
        )
    }

    return (
        <div>
            {isOptionsOpen ? 
                <SpinnerOptionModal onClose={() => {setIsOptionsOpen(false)}}/> : 
                null
            }
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {userToken === '' ?
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {isSignUp ? 'Create an Account' : 'Sign in to your account'}
                    </h2> :
                    <>
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            You are logged in!
                        </h2>
                        {/* <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            
                        </h2> */}
                    </>
                    }
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {
                        isUserLoading ? 
                        <div className="flex flex-1 justify-center">
                            <Oval color="#2870ed" height={100} width={100} secondaryColor=''/> 
                        </div> : <>
                        {userToken === "" ? 
                            <LogInContent 
                                isSignUp={isSignUp} 
                                createUser={createUser} 
                                loginUser={loginUser}
                                onToggle={() => {setIsSignUp(!isSignUp)}}
                            /> :
                            <div>
                                <MyButton text={'Connect Square Account'} onClick={() => {router.push(squareAuthorizeLink);}}/>
                                <br />
                                
                                <MyButton text={'Prize Page'} onClick={() => {router.push('/PrizePage');}}/>
                                <br />
                                <MyButton text={'Change Spinner Options'} onClick={() => {
                                    setIsOptionsOpen(true);
                                }}/>
                                <br />
                                <br />
                                <MyButton text={'Logout'} onClick={logout}/>
                            </div>
                        }
                        </>
                    }

                </div>
            </div>
        </div>
    )
}

export default Registration