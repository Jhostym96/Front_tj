import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function EditControl() {

    const navegar = useNavigate()


    const params = useParams()

    // Hooks
    const [numerocontrol, setNumeroControl] = useState('')
    const [fecha, setFecha] = useState('')
    const [cliente, setCliente] = useState('')
    const [almacen, setAlmacen] = useState('')
    const [maquina, setMaquina] = useState('')
    const [operador, setOperador] = useState('')
    const [turno, setTurno] = useState('')
    const [inicio, setInicio] = useState('')
    const [fin, setFin] = useState('')
    const [total, setTotal] = useState('')

    useEffect(() => {
        axios.post('https://siswebtjbackend-production.up.railway.app/api/controltrabajo/obtenerdatacontroltrabajo', { idcontrol: params.idcontrol }).then(res => {
            console.log(res.data[0])
            const datacontroltrabajo = res.data[0]
            setNumeroControl(datacontroltrabajo.numerocontrol)
            setFecha(datacontroltrabajo.fecha)
            setCliente(datacontroltrabajo.cliente)
            setAlmacen(datacontroltrabajo.almacen)
            setMaquina(datacontroltrabajo.maquina)
            setOperador(datacontroltrabajo.operador)
            setTurno(datacontroltrabajo.turno)
            setInicio(datacontroltrabajo.inicio)
            setFin(datacontroltrabajo.fin)
            setTotal(datacontroltrabajo.total)

        })
    }, [])

    // Funcion que actualiza
    function editarControlTrabajo() {
        // Crear objeto para actualizar usuario
        const actualizacontroltrabajo = {
            numerocontrol: numerocontrol,
            fecha: fecha,
            cliente: cliente,
            almacen: almacen,
            maquina: maquina,
            operador: operador,
            turno: turno,
            inicio: inicio,
            fin: fin,
            total: total,
            idcontrol: params.idcontrol
        }

        // Hacer peticion usando axios

        axios.post('https://siswebtjbackend-production.up.railway.app/api/controltrabajo/actualizacontroltrabajo', actualizacontroltrabajo)

            .then(res => {
                Swal.fire(
                    'Actualizacion exitosa!',
                    'Se guardaron las modificaciones',
                    'success'
                )
                navegar('/listcontrol')
            })
            .then(err => { console.log(err) })

    }


    return (
        <>

            <div className='container'>
                <Link to={"/"}><button className='btn btn-warning mt-3'>Regresar</button></Link>

                <div className='row'>
                    <h2 className='mt-4'>Editar Usuario</h2>
                </div>

                <div className='row'>
                    <div className='col-sm-6 offset-3'>

                        <div className='mb-3'>
                            <label htmlFor='numerocontrol' className='form-label'>N°</label>
                            <input value={numerocontrol} onChange={(e) => { setNumeroControl(e.target.value) }} type="numer" className='form-control' />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='fecha' className='form-label'>Fecha</label>
                            <input value={fecha} onChange={(e) => { setFecha(e.target.value) }} type="date" className='form-control' />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='cliente' className='form-label'>Cliente</label>
                            <input value={cliente} onChange={(e) => { setCliente(e.target.value) }} type="text" className='form-control' />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='almacen' className='form-label'>Almacen</label>
                            <input value={almacen} onChange={(e) => { setAlmacen(e.target.value) }} type="text" className='form-control' />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='maquina' className='form-label'>Maquina</label>
                            <input value={maquina} onChange={(e) => { setMaquina(e.target.value) }} type="text" className='form-control' />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='operador' className='form-label'>Operador</label>
                            <input value={operador} onChange={(e) => { setOperador(e.target.value) }} type="text" className='form-control' />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='turno' className='form-label'>Turno</label>
                            <input value={turno} onChange={(e) => { setTurno(e.target.value) }} type="text" className='form-control' />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='inicio' className='form-label'>Inicio</label>
                            <input value={inicio} onChange={(e) => { setInicio(e.target.value) }} type="text" className='form-control' />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='fin' className='form-label'>Fin</label>
                            <input value={fin} onChange={(e) => { setFin(e.target.value) }} type="text" className='form-control' />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='total' className='form-label'>Total</label>
                            <input value={total} onChange={(e) => { setTotal(e.target.value) }} type="text" className='form-control' />
                        </div>

                        <button onClick={editarControlTrabajo} className='btn btn-success mb-3'>Guardar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditControl;