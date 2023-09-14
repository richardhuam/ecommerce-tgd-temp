import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISidebarInitialState {
  isSidebarOpen: boolean;
  screenSize: undefined | number;
}

const initialState: ISidebarInitialState = {
  isSidebarOpen: false,
  screenSize: undefined,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setScreenSize: (state, action: PayloadAction<number>) => {
      state.screenSize = action.payload;
    },
    openSidebar: state => {
      state.isSidebarOpen = true;
    },
    closeSidebar: state => {
      state.isSidebarOpen = false;
    },
    toggleSidebar: state => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const SidebarActions = sidebarSlice.actions;
