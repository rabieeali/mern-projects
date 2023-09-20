import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Crush } from '../types'
import axios from 'axios';
import { RootState } from './store';

axios.defaults.baseURL = 'http://localhost:4000'

export const fetchCrushes = createAsyncThunk('crushes/list', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/crushes')
        return data
    } catch (err: any) {
        console.log(err)
        return rejectWithValue(err.response.data.message)
    }
})

interface State {
    isLoading: boolean;
    error: null | string;
    crushList: Crush[] | [];
    crush: Crush | null;
}

const initialState: State = {
    isLoading: false,
    error: null,
    crushList: [],
    crush: null
}

const crushSlice = createSlice({
    name: 'crushes',
    initialState,
    reducers: {
        getCrushById: (state, action) => {
            const foundCrush = state.crushList.find(c => c._id == action.payload)
            console.log(action.payload)
            if (foundCrush) {
                state.crush = foundCrush
            } else {
                console.log('we did not your crush!')
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCrushes.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchCrushes.fulfilled, (state, action) => {
                state.isLoading = false
                state.crushList = action.payload.data
            })
            .addCase(fetchCrushes.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
    }
});


export const selectCrushSlice = (state: RootState) => state.crushes

export const { getCrushById } = crushSlice.actions

export default crushSlice.reducer