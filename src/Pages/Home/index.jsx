import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const Home = () => {

  const { isAuth } = useContext(AuthContext);


  if (!isAuth()) return <Navigate to="/login" />;

  return (
    <h1>Home</h1>
  )
}

export default Home