import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {
    
  const isSignedIn=localStorage.getItem('user');
console.log('✌️isSignedIn --->', isSignedIn);
  if(!isSignedIn){
    return <Navigate to="/" replace />;
  }

  return children
//   return isSignedIn?children:<Navigate to="/" replace />;

}

export default ProtectedRoute
