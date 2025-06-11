import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const LOCAL_STORAGE_KEY = 'departmentsData';

export const addDepartmentAsync = createAsyncThunk(
    'departments/addDepartmentAsync',
    async (newDepartment) => {
        const currentData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        const updatedData = [...currentData, newDepartment];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
        return updatedData;
    }
);

export const loadDepartmentsAsync = createAsyncThunk(
    'departments/loadDepartmentsAsync',
    async () => {
        const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        return data;
    }
);

export const updateDepartmentAsync = createAsyncThunk(
    'departments/updateDepartmentAsync',
    async (updatedDepartment) => {
        const currentData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        const updatedData = currentData.map(dept =>
            dept.id === updatedDepartment.id ? updatedDepartment : dept
        );
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
        return updatedData;
    }
);


export const deleteDepartmentsAsync = createAsyncThunk(
    'departments/deleteDepartmentsAsync',
    async (id) => {
        const currentData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        const updatedData = currentData.filter(dept => dept.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
        return updatedData;
    }
)

const initialState = {
    data: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [],
};

const DepartmentsSlice = createSlice({
    name: 'departments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addDepartmentAsync.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(loadDepartmentsAsync.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(updateDepartmentAsync.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(deleteDepartmentsAsync.fulfilled, (state, action) => {
                state.data = action.payload;
            })

    },
});

export default DepartmentsSlice.reducer;