import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import ListAsistencia from '../../Components/ControlAsistencia/ListAsistencia';
import { AuthContext } from '../../Context/AuthContext';

const Asistencia = () => {

  const { isAuth } = useContext(AuthContext);


  if (!isAuth()) return <Navigate to="/login" />;

  return (
    <ListAsistencia/>
  )
}

export default Asistencia