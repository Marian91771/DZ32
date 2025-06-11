import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import DepartmentsReducer from './store/DepartmentsSlice.js';
import EmployeesReducer from './store/EmployeesSlice.js'
import AuthReducer from './store/AuthSlice.js'

const store = configureStore({
  reducer: {
    departments: DepartmentsReducer,
    employees: EmployeesReducer,
    auth: AuthReducer,
  },
});

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);