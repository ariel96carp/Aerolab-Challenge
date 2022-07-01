// import { useEffect } from 'react'
import { useAppSelector } from '../../../hooks/TypedStoreHooks'
import ProductsCard from './ProductsCard'

const ProductsList = (): JSX.Element => {
    const products = useAppSelector((state) => state.products.products)
    const user = useAppSelector((state) => state.user.user)
    const pageRendered = useAppSelector((state) => state.products.page)
    const filterSelected = useAppSelector((state) => state.products.filter)
    const maxProducts: number = products.length / 2
    const productsIndexStart: number = (pageRendered * maxProducts) - maxProducts
    const productsIndexEnd: number = pageRendered * maxProducts
    const cheaperProducts = products
        .slice(productsIndexStart, productsIndexEnd)
        .sort((a, b) => a.cost - b.cost)
    const expensiveProducts = products
        .slice(productsIndexStart, productsIndexEnd)
        .sort((a, b) => b.cost - a.cost)
    let productsRendered
    switch (filterSelected) {
        case 'lowest':
            productsRendered = cheaperProducts
            break
        case 'highest':
            productsRendered = expensiveProducts
            break
        default:
            productsRendered = products.slice(productsIndexStart, productsIndexEnd)
            break
    }
    // useEffect(() => {
    //     console.log(productsIndexStart, productsIndexEnd)
    // }, [ productsIndexStart, productsIndexEnd ])
    return (
        <main
            className="pt-4 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5"
        >
            {
                productsRendered.map(({
                    _id,
                    img,
                    name,
                    category,
                    cost
                }, index) => (
                    <ProductsCard
                        key={`${_id}${index}`}
                        id={_id}
                        isAvailable={!(user?.points as number < cost)}
                        image={img.hdUrl}
                        product={name}
                        category={category}
                        cost={cost}
                    />
                ))
            }
        </main>
    )
}

export default ProductsList
