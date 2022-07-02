import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/TypedStoreHooks'
import { reedemProduct, removePoints } from '../../../redux/user'
import AlertModal from '../../../common/AlertModal'
import Loader from '../../../common/Loader'
import buyBlueImage from '../../../../assets/img/buy-blue.svg'
import coinImage from '../../../../assets/img/coin.svg'
import aerolabImage from '../../../../assets/img/aeropay-3.svg'
import defaultImage from '../../../../assets/img/default-product-image.png'

type CardProps = {
    isAvailable?: boolean,
    product: string,
    category: string,
    cost: number,
    image?: string,
    id: string
}
const ProductsCard: FC<CardProps> = ({
    isAvailable = true,
    product,
    category,
    cost,
    image = defaultImage,
    id
}) => {
    const [ redeemingProduct, setRedeemingProduct ] = useState<boolean>(false)
    const [ redeemedProduct, setRedeemedProduct ] = useState<boolean>(false)
    const [ redeemError, setRedeemError ] = useState<boolean>(false)
    const userPoints = useAppSelector((state) => state.user.user?.points)
    const dispatch = useAppDispatch()
    const saveProduct = (): void => {
        setRedeemingProduct(true)
        dispatch(reedemProduct(id))
            .then(() => {
                setRedeemingProduct(false)
                setRedeemedProduct(true)
                dispatch(removePoints(cost))
            })
            .catch(() => {
                setRedeemingProduct(false)
                setRedeemError(true)
            })
    }
    return (
        <article>
            { redeemingProduct && <Loader /> }
            { redeemedProduct && <AlertModal closeModal={() => setRedeemedProduct(false)} /> }
            {
                redeemError
                    && <AlertModal isChecked={false} closeModal={() => setRedeemError(false)} />
            }
            <div
                className={`
                    h-[28rem]
                    sm:h-[25rem]
                    shadow-md
                    text-sm
                    font-semibold
                    flex
                    flex-col 
                    relative 
                    group
                    shadow-gray-300
                    transition-transform
                    bg-white
                    ${isAvailable ? 'md:hover:shadow-2xl md:hover:-translate-y-3 md:hover:shadow-gray-500' : 'opacity-50'}`}
            >
                <div className="h-[70%] pb-3 relative">
                    <img src={image} alt="Producto" className="w-full h-full object-cover object-center" />
                    <div className="absolute bottom-0 left-1/2 h-[1px] w-[calc(100%-(1.5rem*2))] bg-gray-300 translate-x-[-50%]" />
                </div>
                <div className="mt-auto px-6 pb-4">
                    <h3 className="text-gray-400">{category}</h3>
                    <p className="text-gray-700">{product}</p>
                </div>
                {
                    isAvailable
                        ? <img src={buyBlueImage} alt="Compra" className="absolute top-4 right-4 w-[2em]" />
                        : (
                            <div
                                className="absolute top-4 right-4 md:text-xs text-white bg-gray-700/75 p-2 rounded-full font-light flex items-center gap-1"
                            >
                                {userPoints && `You need ${cost - userPoints}`}
                                <img src={coinImage} alt="Moneda" className="w-[1.5em]" />
                            </div>
                        )
                }
                {
                    isAvailable
                        && (
                            <div className="hidden w-full h-full absolute top-0 left-0 px-6 bg-sky-500/70 md:flex flex-col items-center justify-center gap-3 card-effect">
                                <div className="flex items-center gap-2">
                                    <p className="text-white text-2xl tracking-wider">{cost}</p>
                                    <img src={coinImage} alt="Moneda" />
                                </div>
                                <button
                                    type="button"
                                    className="btn-primary w-full"
                                    onClick={() => saveProduct()}
                                >
                                    Redeem now
                                </button>
                            </div>
                        )
                }
            </div>
            {
                isAvailable
                    && (
                        <button
                            type="button"
                            className="mt-3 py-4 rounded-xl flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 w-full md:hidden"
                            onClick={() => saveProduct()}
                        >
                            <div className="inline-flex items-center gap-2 m-auto font-semibold text-white">
                                Redeem for
                                <img src={aerolabImage} alt="Aerolab" />
                                {cost}
                            </div>
                        </button>
                    )
            }
        </article>
    )
}

export default ProductsCard
