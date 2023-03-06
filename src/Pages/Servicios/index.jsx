import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import ListControl from '../../Components/ControlTrabajo/ListControl';
import { AuthContext } from '../../Context/AuthContext';

const Servicios = () => {

    const { isAuth } = useContext(AuthContext);


    if (!isAuth()) return <Navigate to="/login" />;

    return (
        <ListControl/>
    )
}

export default Servicios