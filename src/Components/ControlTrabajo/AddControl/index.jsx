import React, { useContext } from 'react'
import { useState } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { AuthContext } from '../../../Context/AuthContext';

function AddControlTrabajo() {

    const { user } = useContext(AuthContext);

    const navegar = useNavigate()

    // Hooks
    const [numeroControl, setNumeroControl] = useState('')
    const [fecha, setFecha] = useState('')
    const [cliente, setCliente] = useState('')
    const [almacen, setAlmacen] = useState('')
    const [maquina, setMaquina] = useState('')
    const [operador, setOperador] = useState(user.name)
    const [turno, setTurno] = useState('')
    const [serviceType, setServiceType] = useState('')
    const [inicio, setInicio] = useState('')
    const [fin, setFin] = useState('')
    const [total, setTotal] = useState('')
    const [tarifa, setTarifa] = useState('')

    const [esHora, setEsHora] = useState(false);


    function manejarCambioCheckbox(evento) {
        setEsHora(evento.target.checked);
    }

    var controltrabajo = {
        numeroControl: numeroControl,
        fecha: fecha,
        cliente: cliente,
        almacen: almacen,
        maquina: maquina,
        operador: operador,
        turno: turno,
        serviceType: serviceType,
        inicio: inicio,
        fin: fin,
        total: total,
        tarifa: tarifa,
    }

    function handleInicioChange(event) {
        const valor = event.target.value;
        setInicio(valor);
        const resultado = fin - valor;
        setTotal(resultado);
    }

    function handleFinChange(event) {
        const valor = event.target.value;
        setFin(valor);
        const resultado = valor - inicio;
        setTotal(resultado.toFixed(2));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/v1/maquinaria', controltrabajo, {
                headers: {
                    Authorization: `bearer ${user.token}`
                }
            })
            console.log(response)
            Swal.fire({
                icon: "success",
                text: "Servicio creado correctamente",
            })

            navegar("/servicios")
        }
        catch (error) {
            console.log(error.response.data)
            Swal.fire({
                icon: "error",
                text: Object.values(error.response.data),
            })
        }
    }

    const handleServicioChange = (event) => {
        const opcionSeleccionada = event.target.value;
        // aquí puedes utilizar la opción seleccionada para determinar la tarifa correspondiente
        // por ejemplo:
        if (opcionSeleccionada === "LAMPON") {
            setTarifa(8.50);
        } else if (opcionSeleccionada === "RASTRA") {
            setTarifa(10.00);
        } else if (opcionSeleccionada === "MONTACARGA") {
            setTarifa(7.00);
        } else {
            setTarifa("");
        }
        setServiceType(opcionSeleccionada);
    };



    return (
        <>
            <div className='container'>
                <Link to={"/servicios"}><button className='btn btn-warning mt-3'>Regresar</button></Link>

                <div className='row'>
                    <h2 className='mt-4'>Registrar servicio</h2>
                </div>

                <form className='row' onSubmit={handleSubmit}>
                    <div className='col-sm-6'>

                        <div className='mb-3'>
                            <label htmlFor='numeroControl' className='form-label'>N°</label>
                            <input value={numeroControl} onChange={(e) => { setNumeroControl(e.target.value) }} type="number" className='form-control' />
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
                            <input value={operador} onChange={(e) => { setOperador(e.target.value) }} type="text" className='form-control' disabled />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='turno' className='form-label'>Turno</label>
                            <select value={turno} onChange={(e) => { setTurno(e.target.value) }} type="text" className='form-control'>
                                <option value="">SELECCIONAR...</option>
                                <option value="DIA">DIA</option>
                                <option value="NOCHE">NOCHE</option>
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='serviceType' className='form-label'>Tipo de servicio</label>
                            <select value={serviceType} onChange={handleServicioChange} type="text" className='form-control' >
                                <option value="">SELECCIONAR...</option>
                                <option value="LAMPON">LAMPON</option>
                                <option value="RASTRA">RASTRA</option>
                                <option value="MONTACARGA">MONTACARGA</option>
                            </select>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='eshora' className='form-label'>
                                ¿Es hora?
                                <input type="checkbox" checked={esHora} onChange={manejarCambioCheckbox} />
                            </label>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='inicio' className='form-label'>Inicio</label>
                            <input type={esHora ? "time" : "number"} value={inicio} onChange={handleInicioChange} className='form-control' />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='fin' className='form-label'>Fin</label>
                            <input type={esHora ? "time" : "number"} value={fin} onChange={handleFinChange} className='form-control' />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='total' className='form-label'>Total</label>
                            <input value={!esHora ? total : total} onChange={(e) => { setTotal(e.target.value) }} type="number" className='form-control' disabled={!esHora} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='tarifa' className='form-label'>Tarifa</label>
                            <input value={tarifa} onChange={(e) => { setTarifa(e.target.value) }} type="number" className='form-control' readOnly disabled />
                        </div>
                        <div className="col text-center">
                            <button className='btn btn-success mb-3'>Guardar</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddControlTrabajo;