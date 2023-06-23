import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    views: 0
}

export const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
      increase: (state, action) => {
            state.views += 1;
        }
    }
}) 

export const { increase } = viewSlice.actions;
export default viewSlice.reducer;