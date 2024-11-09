import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider,Route } from 'react-router-dom'
import Signup from './pages/Signup.jsx';
import ProtectedRoute from './component/ProtectedRoute.jsx';
import Dashboard from './pages/Dashboard.jsx';


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Signup/>}/>
      <Route path='dashboard' element={
        <ProtectedRoute>
             <Dashboard/>
        </ProtectedRoute>
       }
        
        />

      

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
