import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    value : null
}

const sessionSlice = createSlice({
    name : "session",
    initialState,
    reducers : {
        setSession(state,action){
            state.value = action.payload;
        }
    },
});

export const {setSession} = sessionSlice.actions;
export default sessionSlice.reducer;