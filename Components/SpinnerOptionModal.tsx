import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Modal = ({onClose} : {onClose: () => void}) => {

    const { rouletteOptions, setRouletteOptions} = useAppContext();

    const [array, setArray] = useState(rouletteOptions);

    const onInputChange = (index: number, e: React.FormEvent<HTMLInputElement>) => {
        if(e.currentTarget.value === '') {
            let newArr = [...array];
            newArr[index] = 0;
            setArray(newArr);
        }
        else if(!isNaN(parseInt(e.currentTarget.value)) && parseInt(e.currentTarget.value) > 0) {
            let newArr = [...array];
            newArr[index] = parseInt(e.currentTarget.value);
            setArray(newArr);
        }
    }

    const onSave = async () => {
        await setRouletteOptions(JSON.stringify(array));
        onClose();
    }

    return (
        <div className="relative z-40" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full justify-center items-center p-4 text-center sm:p-0">

              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-80">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start flex flex-1">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left container">
                      <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                        Spinner Options
                      </h3>
                      <div className="mt-2 container flex flex-col w-68">
                        <div className="flex items-center justify-between mb-1">
                            <label>{`Option ${1} (USD):`}</label>
                            <input type="text" 
                                value={array[0]} 
                                className="w-24 block rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600" 
                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    onInputChange(0, e);
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between mb-1">
                            <label>{`Option ${2} (USD):`}</label>
                            <input type="text" 
                                value={array[1]} 
                                className="w-24 block rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600" 
                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    onInputChange(1, e);
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between mb-1">
                            <label>{`Option ${3} (USD):`}</label>
                            <input type="text" 
                                value={array[2]} 
                                className="w-24 block rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600" 
                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    onInputChange(2, e);
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between mb-1">
                            <label>{`Option ${4} (USD):`}</label>
                            <input type="text" 
                                value={array[3]} 
                                className="w-24 block rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600" 
                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    onInputChange(3, e);
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between mb-1">
                            <label>{`Option ${5} (USD):`}</label>
                            <input type="text" 
                                value={array[4]} 
                                className="w-24 block rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600" 
                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    onInputChange(4, e);
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between mb-1">
                            <label>{`Option ${6} (USD):`}</label>
                            <input type="text" 
                                value={array[5]} 
                                className="w-24 block rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600" 
                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    onInputChange(5, e);
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between mb-1">
                            <label>{`Option ${7} (USD):`}</label>
                            <input type="text" 
                                value={array[6]} 
                                className="w-24 block rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600" 
                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    onInputChange(6, e);
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between mb-1">
                            <label>{`Option ${8} (USD):`}</label>
                            <input type="text" 
                                value={array[7]} 
                                className="w-24 block rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600" 
                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    onInputChange(7, e);
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between mb-1">
                            <label>{`Option ${9} (USD):`}</label>
                            <input type="text" 
                                value={array[8]} 
                                className="w-24 block rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600" 
                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    onInputChange(8, e);
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between mb-1">
                            <label>{`Option ${10} (USD):`}</label>
                            <input type="text" 
                                value={array[9]} 
                                className="w-24 block rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600" 
                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    onInputChange(9, e);
                                }}
                            />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button 
                      type="button" 
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                      onClick={onSave}
                    >
                        Save
                    </button>
                  <button type="button" 
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={onClose}
                  >
                      Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Modal