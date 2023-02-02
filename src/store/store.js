import {configureStore} from '@reduxjs/toolkit';
import dailyWeatherReducer from '../slices/dailyWeatherSlice';
import hourlyWeatherReducer from '../slices/hourlyWeatherSlice';

const store = configureStore({
    reducer: {
        daily: dailyWeatherReducer,
        hourly: hourlyWeatherReducer
    }
});

export default store;