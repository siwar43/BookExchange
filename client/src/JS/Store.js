import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './UserSlice/UserSlice';
import bookSlice from './bookSlice';
import orderReducer from './OrderSlice'; // ✅ importer le reducer

export const store = configureStore({
    reducer: {
        user: UserSlice,
        book: bookSlice, 
        order: orderReducer, // ✅ ici on utilise le reducer importé
    },
});
