import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import AddControlTrabajo from '../../Components/ControlTrabajo/AddControl';
import { AuthContext } from '../../Context/AuthContext';

const Servicios = () => {

    const { isAuth } = useContext(AuthContext);


    if (!isAuth()) return <Navigate to="/login" />;

    return (

        <AddControlTrabajo />
    )
}

export default Servicios