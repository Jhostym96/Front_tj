import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { AuthContext } from '../../../Context/AuthContext';

function AddAsistencia() {

  const { user, isAuth } = useContext(AuthContext);

  const navegar = useNavigate()

  // Hooks
  const [fecha, setFecha] = useState('')
  const [cliente, setCliente] = useState('')



  var controlAsistencia = {
    fecha: fecha,
    cliente: cliente
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://backtj.fly.dev/api/v1/asistencia', controlAsistencia, {
        headers: {
          Authorization: `bearer ${user.token}`
        }
      })
      console.log(response)
      Swal.fire({
        icon: "success",
        text: "Asistencia creado correctamente",
      })

      navegar("/asistencia")
    }
    catch (error) {
      console.log(error.response.data)
      Swal.fire({
        icon: "error",
        text: Object.values(error.response.data),
      })
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isAuth()) return <Navigate to="/login" />;

  return (

    <div className='container p-3 mt-10'>
      <div className='text-center mb-2'>
        <Link to={"/asistencia"}><button className='btn btn-warning mt-3'>Regresar</button></Link>
      </div>

      <div className='container d-flex align-items-center justify-content-center'>
        <form className='mx-auto' onSubmit={handleSubmit}>
          <h2 className='text-center'>Registrar Asistencia</h2>
          <div className='col-sm-12'>
            <div className='row mt-2'>

              <label htmlFor='fecha' className='form-label'>Fecha</label>
              <input value={fecha} onChange={(e) => { setFecha(e.target.value) }} type="date" className='form-control' />

              <label htmlFor='cliente' className='form-label'>N°</label>
              <input value={cliente} onChange={(e) => { setCliente(e.target.value) }} type="text" className='form-control' />

            </div>
          </div>
          <div className="col text-center mt-2">
            <button className='btn btn-success col'>Guardar</button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default AddAsistencia;