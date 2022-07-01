import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

const apiURL: string = process.env.REACT_APP_API_URL as string
const userToken: string = process.env.REACT_APP_USER_TOKEN as string
type TUser = {
    _id: string,
    name: string,
    points: number,
    createDate: string,
    redeemHistory: []
    _v: number
}

type TProductReedemed = {
    message: string
}

type TUserPoints = {
    message: string,
    'New Points': number
}

export const getUser = createAsyncThunk<TUser>(
    'user/getUser',
    async () => {
        const headers = new Headers()
        headers.append('Content-type', 'application/json')
        headers.append('Accept', 'application/json')
        headers.append('Authorization', `Bearer ${userToken}`)
        const params = {
            headers
        }
        const response = await fetch(`${apiURL}/user/me`, params)
        return response.json()
    }
)

export const reedemProduct = createAsyncThunk<TProductReedemed, string>(
    'user/reedemProduct',
    async (productId: string) => {
        const headers = new Headers()
        headers.append('Content-type', 'application/json')
        headers.append('Accept', 'application/json')
        headers.append('Authorization', `Bearer ${userToken}`)
        const data = {
            productId
        }
        const params = {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        }
        const response = await fetch(`${apiURL}/redeem`, params)
        return response.json()
    }
)

export const addPoints = createAsyncThunk<TUserPoints, number>(
    'user/addPoints',
    async (pointsAdded: number) => {
        const headers = new Headers()
        headers.append('Content-type', 'application/json')
        headers.append('Accept', 'application/json')
        headers.append('Authorization', `Bearer ${userToken}`)
        const data = {
            amount: pointsAdded
        }
        const params = {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        }
        const response = await fetch(`${apiURL}/user/points`, params)
        return response.json()
    }
)

type TState = {
    user: TUser | null
}

const initialState: TState = {
    user: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        removePoints: (state, action: PayloadAction<number>) => {
            if (state.user) state.user.points -= action.payload
        },
        resetUser: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, { payload }) => {
                state.user = payload
            })
            .addCase(addPoints.fulfilled, (state, { payload }) => {
                if (state.user) state.user.points = payload['New Points']
            })
    }
})

export const { removePoints, resetUser } = userSlice.actions

export default userSlice.reducer
