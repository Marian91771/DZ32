import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const LOCAL_STORAGE_KEY = 'EmployeesData';

export const addEmployeeAsync = createAsyncThunk(
    'employeess/addEmployeeAsync',
    async (newDepartment) => {
        const currentData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        const updatedData = [...currentData, newDepartment];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
        return updatedData;
    }
);

export const loadEmployeesAsync = createAsyncThunk(
    'employees/loadEmployeesAsync',
    async () => {
        const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        return data;
    }
);

export const updateEmployeeAsync = createAsyncThunk(
    'employees/updateEmployeeAsync',
    async (updatedEmployee) => {
        const currentData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        const updatedData = currentData.map(dept =>
            dept.id === updatedEmployee.id ? updatedEmployee : dept
        );
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
        return updatedData;
    }
);

export const deleteEmployeesAsync = createAsyncThunk(
    'employees/deleteEmployeesAsync',
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

const EmployeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addEmployeeAsync.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(loadEmployeesAsync.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(updateEmployeeAsync.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(deleteEmployeesAsync.fulfilled, (state, action) => {
                state.data = action.payload;
            })

    },
});

export default EmployeesSlice.reducer;