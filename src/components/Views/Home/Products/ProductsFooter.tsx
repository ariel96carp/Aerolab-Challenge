import { useAppSelector, useAppDispatch } from '../../../hooks/TypedStoreHooks'
import { changePage } from '../../../redux/products'
import arrowRight from '../../../../assets/img/arrow-right.svg'
import arrowLeft from '../../../../assets/img/arrow-left.svg'

const ProductsFooter = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const products = useAppSelector((state) => state.products.products)
    const pageRendered = useAppSelector((state) => state.products.page)
    const maxProducts = products.length / 2
    return (
        <footer className="mt-4 border-b">
            <div className="flex justify-between items-center py-4">
                <p className="font-semibold text-gray-500">
                    {`${maxProducts * pageRendered} of ${products.length} products`}
                </p>
                {
                    pageRendered === 1
                        ? (
                            <button
                                type="button"
                                onClick={() => dispatch(changePage(2))}
                            >
                                <img src={arrowRight} alt="Flecha" className="w-[2.5em]" />
                            </button>
                        )
                        : (
                            <button
                                type="button"
                                onClick={() => dispatch(changePage(1))}
                            >
                                <img src={arrowLeft} alt="Flecha" className="w-[2.5em]" />
                            </button>
                        )
                }
            </div>
        </footer>
    )
}

export default ProductsFooter
