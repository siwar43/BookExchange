import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './UserSlice/UserSlice'

import bookSlice from './bookSlice'


export const store = configureStore({
    reducer: {
        user:UserSlice, 
        book:bookSlice, 
    },
})