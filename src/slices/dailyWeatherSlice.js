import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//daily action
export const fetchDailyWeatherAction = createAsyncThunk(
    'weather/fetch',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            
            const { data } = await axios.get('http://api.openweathermap.org/data/2.5/forecast/daily?lat=42.36&lon=-71.09&units=imperial&cnt=5&appid=afadf010c26fa7de99a0586361ab4a30');

            return data;
        }
        catch (error) {
            if(!error?.response){
                throw error
            }
            return rejectWithValue(error?.response?.data)
        }
    }
)

// daily slices
const dailyWeatherSlices = createSlice({
    name: "weather",
    initialState: {},
    extraReducers: (builder) => {

        //Daily
        //pending
        builder.addCase(fetchDailyWeatherAction.pending, (state, action) => {
            state.loading = true;
        });
        //fulfilled
        builder.addCase(fetchDailyWeatherAction.fulfilled, (state, action) => {
            state.weather = action?.payload;
            state.loading = true;
            state.error = undefined;
        });
        //rejected
        builder.addCase(fetchDailyWeatherAction.rejected, (state, action) => {
            state.loading = false;
            state.error = undefined;
            state.error = action?.payload;
        });
    },
})

export default dailyWeatherSlices.reducer;

