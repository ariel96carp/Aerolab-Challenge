import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../hooks/TypedStoreHooks'
import { getProducts } from '../../../redux/products'
import ProductsHeader from './ProductsHeader'
import ProductsList from './ProductsList'
import ProductsFooter from './ProductsFooter'

const Products = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const [ loadingProducts, setLoadingProducts ] = useState<boolean>(true)
    const [ errorOnLoading, setErrorOnLoading ] = useState<boolean>(false)
    useEffect(() => {
        dispatch(getProducts())
            .then(() => setLoadingProducts(false))
            .catch(() => {
                setLoadingProducts(false)
                setErrorOnLoading(true)
            })
    }, [])
    return (
        <section className="py-10">
            <div className="page-container">
                <div className="section-container">
                    { loadingProducts && <p>Loading products...</p> }
                    { errorOnLoading && <p>The products could not be loaded.</p> }
                    {
                        (!errorOnLoading && !loadingProducts)
                            && (
                                <>
                                    <ProductsHeader />
                                    <ProductsList />
                                    <ProductsFooter />
                                </>
                            )
                    }
                </div>
            </div>
        </section>
    )
}

export default Products
