import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Navigate, BrowserRouter as Router} from 'react-router-dom';


import { Route ,Routes ,Outlet } from 'react-router-dom';
import SignUp from './components/SignUp.jsx';
import { PrivateRoutes } from './components/PrivateRoutes.jsx';
// const token = sessionStorage.getItem('token');s
// let navigate = useNavigate();
createRoot(document.getElementById('root')).render(
  
  <StrictMode>
   <Router>
     <App/>
    </Router>
  </StrictMode>,
)
