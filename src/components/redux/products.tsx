import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

const apiURL: string = process.env.REACT_APP_API_URL as string
const userToken: string = process.env.REACT_APP_USER_TOKEN as string
type TProducts = {
    _id: string
    img: { url: string, hdUrl: string },
    name: string,
    cost: number,
    category: string
}

export const getProducts = createAsyncThunk<TProducts[]>(
    'products/getProducts',
    async () => {
        const headers = new Headers()
        headers.append('Content-type', 'application/json')
        headers.append('Accept', 'application/json')
        headers.append('Authorization', `Bearer ${userToken}`)
        const params = {
            headers
        }
        const response = await fetch(`${apiURL}/products`, params)
        return response.json()
    }
)

type TState = {
    products: TProducts[]
    page: number,
    filter: 'recent' | 'lowest' | 'highest'
}

const initialState: TState = {
    products: [],
    page: 1,
    filter: 'recent'
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        changePage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setFilter: (state, action: PayloadAction<'recent' | 'lowest' | 'highest'>) => {
            state.filter = action.payload
        },
        resetProducts: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, { payload }) => {
                state.products.push(...payload)
            })
    }
})

export const { changePage, setFilter, resetProducts } = productsSlice.actions

export default productsSlice.reducer
