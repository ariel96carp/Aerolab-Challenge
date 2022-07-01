import { FC, useEffect } from 'react'
import checkImage from '../../assets/img/comprobar.png'
import errorImage from '../../assets/img/rechazado.png'

type TModalProps = {
    closeModal: () => void,
    closePoints?: () => void
    isChecked?: boolean,
    type?: 'redeem' | 'points'
}
const AlertModal: FC<TModalProps> = ({
    closeModal,
    isChecked = true,
    closePoints,
    type = 'redeem'
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            closeModal()
            if (closePoints) closePoints()
        }, 2000)
        return () => clearTimeout(timer)
    }, [])
    return (
        <div className="fixed top-0 left-0 w-full h-[100vh] z-50 bg-black/75 flex justify-center items-center">
            <div
                className="w-[90%] md:w-[60%] lg:w-[40%] h-[20rem] bg-gray-100 rounded-md flex flex-col items-center gap-6 py-4 px-2"
            >
                {
                    isChecked
                        ? <img src={checkImage} alt="Check" className="w-[7em]" />
                        : <img src={errorImage} alt="Check" className="w-[7em]" />
                }
                {
                    isChecked
                        ? (
                            <p
                                className="font-semibold text-lg text-gray-900 text-center"
                            >
                                {
                                    type === 'redeem'
                                        ? 'The product has been successfully redeemed.'
                                        : 'Aeropoints added successfully.'
                                }
                            </p>
                        )
                        : (
                            <p
                                className="font-semibold text-lg text-gray-900 text-center"
                            >
                                {
                                    type === 'redeem'
                                        ? 'The product could not be redeemed.'
                                        : 'Aeropoints could not be added.'
                                }
                            </p>
                        )
                }
                <button
                    type="button"
                    onClick={closeModal}
                    className="btn-primary bg-sky-400 font-semibold text-white mt-auto"
                >
                    Close Modal
                </button>
            </div>
        </div>
    )
}

export default AlertModal
