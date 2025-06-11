import './App.css'
import AuthPage from './pages/AuthPage'
import EmployeesPage from './pages/EmployeesPage'
import DepartmentsPage from './pages/DepartmentsPage'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import { useSelector } from 'react-redux'

function App() {

  const { isAuth } = useSelector(state => state.auth)

  return (
    <>
      <Header />
      <Routes>

        {!isAuth && <Route path='*' element={<AuthPage />} />}
        {!!isAuth && <Route path='/employees' element={<EmployeesPage />} />}
        {!!isAuth && <Route path='/departments' element={<DepartmentsPage />} />}
      </Routes>

    </>
  )
}

export default App
