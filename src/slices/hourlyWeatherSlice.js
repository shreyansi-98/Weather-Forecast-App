import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchHourlyWeatherAction = createAsyncThunk(
    'weather/fetch',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {            
            
            const { data } = await axios.get('http://api.openweathermap.org/data/2.5/forecast?lat=42.36&lon=-71.09&units=imperial&appid=afadf010c26fa7de99a0586361ab4a30');

            return data
        }
        catch (error) {
            if(!error?.response){
                throw error
            }
            return rejectWithValue(error?.response?.data)
        }
    }
)

// hourly slices
const hourlyWeatherSlices = createSlice({
    name: "weather",
    initialState: {},
    extraReducers: (builder) => {

        //Hourly
        //pending
        builder.addCase(fetchHourlyWeatherAction.pending, (state, action) => {
            state.loading = true;
        });
        //fulfilled
        builder.addCase(fetchHourlyWeatherAction.fulfilled, (state, action) => {
            state.weather = action?.payload;
            state.loading = true;
            state.error = undefined;
        });
        //rejected
        builder.addCase(fetchHourlyWeatherAction.rejected, (state, action) => {
            state.loading = false;
            state.error = undefined;
            state.error = action?.payload;
        });
    },
})

export default hourlyWeatherSlices.reducer;