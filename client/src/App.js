
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Form from './pages/form';
import './App.css'
import Dashboard from './pages/dashboard';

const ProtectedRoute=({children,auth=false})=>{
  const isLoggedIn=localStorage.getItem('userToken') !==null || false

  if(!isLoggedIn && auth){
    return <Navigate to='/login'/>
  }else if(isLoggedIn && ['/login','/register'].includes(window.location.pathname)){
    return <Navigate to='/'/>
  }else{
    return children
  }
}
 
function App() {
  return (
    <Routes>
      <Route path='/login' element={
        <ProtectedRoute>
          <Form isSignIn/>
        </ProtectedRoute>
      }/>
      <Route path='/register' element={
        <ProtectedRoute>
          <Form/>
        </ProtectedRoute>
      }/>
      <Route path='/' element={
        <ProtectedRoute auth>
          <Dashboard/>
        </ProtectedRoute>
      }/>
    </Routes>
  );
}

export default App;
