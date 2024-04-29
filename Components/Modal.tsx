import { useContext, useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Oval } from "react-loader-spinner";

interface IModalProps {
    onClose: () => void,
    prizeValue: number
}

const Modal = (props: IModalProps) => {

    const {customer, createGiftCard} = useAppContext();

    const [giftCard, setGiftCard] = useState({} as any);
    const [isGiftCardLoading, setIsGiftCardLoading] = useState(false);


    const onRedeem = async () => {
      if(customer.id) {
        setIsGiftCardLoading(true);
        const giftCard = await createGiftCard(customer.id, prizeValue);
        setGiftCard(giftCard)
        setIsGiftCardLoading(false);
      }
    }
    
    const { onClose, prizeValue } = props;
    return (
        <div className="relative z-40" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full justify-center items-center p-4 text-center sm:p-0">

              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start flex flex-1">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left container">
                      <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{
                        prizeValue > 0 ?
                        `You won $${prizeValue} gift card!` :
                        `You did not win a prize.`
                      }
                      </h3>
                      <div className="mt-2 container">

                        {isGiftCardLoading ? 
                          <div className="flex justify-center">
                            <Oval color="#2870ed" height={80} width={80} secondaryColor=''/> 
                          </div>: 
                          <>
                            <>
                              {prizeValue > 0 && !giftCard.gan ? <p className="text-sm text-gray-500">
                                Press Redeem to get your Gift Card code
                                </p> : null}
                            </>
                            <>
                            {giftCard.gan ? 
                              <>
                                <p className="text-sm text-gray-500">
                                  Gift Card code:
                                </p>
                                <p className="text-lg font-bold text-gray-900">
                                  {giftCard.gan}
                                </p>
                              </> : null}
                            </>
                          </>
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {prizeValue > 0 && !giftCard.id ? 
                    <button 
                      type="button" 
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                      onClick={onRedeem}
                    >
                        Redeem
                    </button>
                  : null}
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