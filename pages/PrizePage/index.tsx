
import { useContext, useEffect, useState } from 'react';
import Modal from '../../Components/Modal';
import WheelSpinner from '../../Components/WheelSpinner';
import { Customer, useAppContext } from '../../context/AppContext';
import { Oval }from 'react-loader-spinner';
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/router'

const PrizePage = () => {

    const [showModal, setShowModal] = useState(false);
    const [prizeValue, setPrizeValue] = useState(0);
    const [inputEmail, setInputEmail] = useState("");
    const [currCustomer, setCurrCustomer] = useState({} as Customer);

    const {
        searchCustomer, 
        checkLogedIn,
        getRouletteOptions,
        customer, 
        isCustomerLoading, 
        rouletteOptions, 
        userToken
    } = useAppContext();

    const {hasAccessToken} = useContext(AuthContext);

    const router = useRouter();
    
    const onSpinDone = (prizeValue: number) => {
        setPrizeValue(prizeValue);
        setShowModal(true);
    }

    const getOptions = () => {
        if(rouletteOptions){
            return rouletteOptions.map(val => {
                return val > 0 ? {label: `$${val} Gift Card`, value: val} : {label: '', value: val}
            });
        }
        return [];
    }

    const getDate = () => {
        const date = new Date(Date.parse(currCustomer.created_at));
        return date.toLocaleDateString();
    }

    useEffect(() => {
        getRouletteOptions();
    }, [userToken]);

    useEffect(() => {
        checkLogedIn();
    }, [])

    useEffect(() => {
        setCurrCustomer(customer);
    }, [customer])

    const PlaceholderContent = () => {
        return isCustomerLoading ? 
        <Oval color="#2870ed" height={80} width={80} secondaryColor=''/> :
        <p className='font-semibold'>{'Please Search for an Existing Customer!'}</p>
    }

    const UnderSpinnerContent = () => {
        return  <div className='mt-12 flex flex-1 flex-col items-center'>
            <p className='font-semibold'>Customer: {customer.email_address}</p>
            <p className='font-semibold'> Registered Since: {getDate()}</p>
        </div>;
    }

    return (
        <div>
            {showModal ? <Modal prizeValue={prizeValue} onClose={() => {setShowModal(false)}}/> : null}
            <div className="border-b border-gray-300 w-screen py-4 flex flex-1 justify-center">
            {!hasAccessToken ? <>
                <p>
                    Please connect your Square Account!
                </p>
            </> :
            <>
                <div className="relative text-gray-600 focus-within:text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" className="w-6 h-6">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    </button>
                </span>
                <input 
                    type="search" 
                    name="q" 
                    className="py-2 text-sm bg-gray-200 rounded-md pl-10 focus:outline-none focus:text-gray-900 sm:w-96 w-52" 
                    value={inputEmail}
                    
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        setInputEmail(e.currentTarget.value)
                    }}
                />
                </div>
                &nbsp;
                <button 
                    className="border rounded-md px-3 bg-gray-100 hover:bg-gray-200 text-blue-500 font-semibold"
                    onClick={() => {searchCustomer(inputEmail)}}
                >
                    Search
                </button>
                </>
            }
            <div className='absolute right-3 top-3.5'>
                <button 
                    className="border rounded-md px-3 bg-gray-100 hover:bg-gray-200 text-blue-500 font-semibold h-8"
                    onClick={() => {
                        router.push('/User')
                    }}
                >
                    {userToken === '' ? 'Login' : 'Account'}
                </button>
            </div>
            </div>
            <div className="w-full bg-blue-400 h-screen flex justify-center">
                <div className="bg-white w-[500px] h-fit rounded-md mt-10 flex-col items-center p-10 hidden sm:flex">
                    {currCustomer && Object.keys(currCustomer).length > 0 ? 
                        <>
                            <WheelSpinner size={400} options={getOptions()} onSpinDone={onSpinDone} /> 
                            <UnderSpinnerContent />
                        </>:
                        <>
                            <PlaceholderContent />
                        </>
                    }
                </div>
                <div className="bg-white w-11/12 h-fit rounded-md mt-10 flex-col items-center p-10 flex sm:hidden">
                    {currCustomer && Object.keys(currCustomer).length > 0 ? 
                        <>
                            <WheelSpinner size={300} options={getOptions()} onSpinDone={onSpinDone} /> 
                            <UnderSpinnerContent />
                        </>:
                        <>
                            <PlaceholderContent />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default PrizePage