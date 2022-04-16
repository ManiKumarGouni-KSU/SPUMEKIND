import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import { UserData } from 'types';
export interface SearchProfile {
    searchList: UserData[];
}
const initialState: SearchProfile = {
    searchList: []
};
export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchList: (state, action: PayloadAction<UserData[]>) => {
            console.log(' searchSlice ' + action.payload);
            state.searchList = action.payload;
        }
    }
})

export const { setSearchList } = searchSlice.actions;

export const getSearchList = (state: RootState) => state.searchList;

export default searchSlice.reducer;