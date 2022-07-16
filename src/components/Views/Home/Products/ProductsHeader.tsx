import { useRef } from 'react'
import { useAppSelector, useAppDispatch } from '../../../hooks/TypedStoreHooks'
import { changePage, setFilter } from '../../../redux/products'
import arrowRight from '../../../../assets/img/arrow-right.svg'
import arrowLeft from '../../../../assets/img/arrow-left.svg'

const ProductsHeader = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const pageRendered = useAppSelector((state) => state.products.page)
    const products = useAppSelector((state) => state.products.products)
    const filterSelected = useAppSelector((state) => state.products.filter)
    const maxProducts = products.length / 2
    const pagesToRender: number = Math.ceil((products.length / maxProducts))
    const headerRef = useRef<HTMLHeadingElement>(null)
    const changeFilter = (filter: 'recent' | 'lowest' | 'highest') => {
        if (filterSelected !== filter) dispatch(setFilter(filter))
    }
    return (
        <header ref={headerRef}>
            <div className="flex justify-between items-center pb-4 border-b">
                <div className="flex items-center flex-wrap gap-4">
                    <div className="border-r-2 pr-[1rem] border-gray-300 hidden md:block">
                        <p className="text-gray-500 font-semibold">
                            {`Page ${pageRendered} of ${pagesToRender}`}
                        </p>
                    </div>
                    <p className="text-gray-600">Sort by:</p>
                    <button
                        type="button"
                        className={`filter-option btn-primary effect ${filterSelected === 'recent' ? 'selected' : ''}`}
                        onClick={() => changeFilter('recent')}
                    >
                        Most recent
                    </button>
                    <button
                        type="button"
                        className={`filter-option btn-primary effect ${filterSelected === 'lowest' ? 'selected' : ''}`}
                        onClick={() => changeFilter('lowest')}
                    >
                        Lowest price
                    </button>
                    <button
                        type="button"
                        className={`filter-option btn-primary effect ${filterSelected === 'highest' ? 'selected' : ''}`}
                        onClick={() => changeFilter('highest')}
                    >
                        Highest price
                    </button>
                </div>
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
        </header>
    )
}

export default ProductsHeader
