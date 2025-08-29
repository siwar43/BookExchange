import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getbook = createAsyncThunk("book/get", async () => {
    try {
        let result = await axios.get("http://localhost:5000/book/");
        return result;
    } catch (error) {
        console.log(error);
    }
});
export const addbook = createAsyncThunk("book/add", async (newbook) => {
    try {
        let result = await axios.post("http://localhost:5000/book/add", newbook);
        return result;
    } catch (error) {
        console.log(error);
    }
});
export const deletebook = createAsyncThunk("book/delete", async (id) => {
    try {
        let result = await axios.delete(`http://localhost:5000/book/${id}`);
        return result;
    } catch (error) {
        console.log(error);
    }
});

export const editbook = createAsyncThunk(
    "book/edit",
    async ({ id, edited }) => {
        try {
        let result = await axios.put(`http://localhost:5000/book/${id}`, edited);
        return result;
        } catch (error) {
        console.log(error);
        }
    }
);

const initialState = {
    booklist: null,
    status: null,
};

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getbook.pending, (state) => {
            state.status = "pending";
        })
        .addCase(getbook.fulfilled, (state, action) => {
            state.status = "success";
            state.booklist = action.payload.data.books;
        })
        .addCase(getbook.rejected, (state) => {
            state.status = "fail";
        })
        .addCase(addbook.pending, (state) => {
            state.status = "pending";
        })
        .addCase(addbook.fulfilled, (state, action) => {
            state.status = "success";
        })
        .addCase(addbook.rejected, (state) => {
            state.status = "fail";
        })
        .addCase(deletebook.pending, (state) => {
            state.status = "pending";
        })
        .addCase(deletebook.fulfilled, (state, action) => {
            state.status = "success";
        })
        .addCase(deletebook.rejected, (state) => {
            state.status = "fail";
        })
        .addCase(editbook.pending, (state) => {
            state.status = "pending";
        })
        .addCase(editbook.fulfilled, (state, action) => {
            state.status = "success";
        })
        .addCase(editbook.rejected, (state) => {
            state.status = "fail";
        });
    },
});

// Action creators are generated for each case reducer function

export default bookSlice.reducer;