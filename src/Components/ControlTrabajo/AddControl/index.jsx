import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { AuthContext } from '../../../Context/AuthContext';

function AddControlTrabajo() {

    const { user, isAuth } = useContext(AuthContext);

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
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);


    const [clientes, setClientes] = useState([]);
    const [palas, setPalas] = useState([]);


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

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://backtj.fly.dev/api/v1/maquinaria', controltrabajo, {
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

    function manejarCambioCheckbox(evento) {
        setEsHora(evento.target.checked);
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

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);

        const extraordinario = !isChecked ? total * 1.5 : (total / 1.5) * 1;
        setTotal(extraordinario.toFixed(2))

    };


    const handleCheckboxChange2 = () => {
        setIsChecked2(!isChecked2);

        const extraordinario = !isChecked2 ? total * 2 : (total / 2) * 1;
        setTotal(extraordinario.toFixed(2))

    };

    const obtenerClientes = async () => {
        return await axios.get('https://backtj.fly.dev/api/v1/cliente', {
            headers: {
                Authorization: `bearer ${user.token}`
            }
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error);
            });
    }
    const obtenerPalas = async () => {
        return await axios.get('https://backtj.fly.dev/api/v1/pala', {
            headers: {
                Authorization: `bearer ${user.token}`
            }
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        obtenerClientes()
            .then(data => {
                setClientes(data.clientes);
            });
        obtenerPalas()
            .then(data => {
                setPalas(data.palas);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isAuth()) return <Navigate to="/login" />;


    return (

        <div className='container p-3 mt-10'>
            <div className='text-center mb-2'>
                <Link to={"/servicios"}><button className='btn btn-warning mt-3'>Regresar</button></Link>
            </div>

            <div className='container d-flex align-items-center justify-content-center vh-100'>
                <form className='mx-auto' onSubmit={handleSubmit}>
                    <h2 className='text-center'>Registrar servicio</h2>
                    <div className='col-sm-12'>
                        <div className='row mt-2'>
                            <div className='col'>
                                <label htmlFor='numeroControl' className='form-label'>N°</label>
                                <input value={numeroControl} onChange={(e) => { setNumeroControl(e.target.value) }} type="number" className='form-control' />
                            </div>
                            <div className='col'>
                                <label htmlFor='fecha' className='form-label'>Fecha</label>
                                <input value={fecha} onChange={(e) => { setFecha(e.target.value) }} type="date" className='form-control' />
                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div className='col'>
                                <label htmlFor='cliente' className='form-label'>Cliente</label>
                                <select value={cliente} onChange={(e) => { setCliente(e.target.value) }} type="text" className='form-control'>
                                    <option value="">Selecionar...</option>
                                    {clientes.map(cliente => (
                                        <option key={cliente._id} value={cliente.c_rz}>{cliente.c_rz}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='col'>
                                <label htmlFor='almacen' className='form-label'>Almacen</label>
                                <input value={almacen} onChange={(e) => { setAlmacen(e.target.value) }} type="text" className='form-control' />
                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div className='col'>
                                <label htmlFor='maquina' className='form-label'>Maquina</label>
                                <select value={maquina} onChange={(e) => { setMaquina(e.target.value) }} type="text" className='form-control'>
                                    <option value="">Selecionar...</option>
                                    {palas.map(pala => (
                                        <option key={pala._id} value={pala.n_pala}>{pala.n_pala}</option>
                                    ))}

                                </select>
                            </div>
                            <div className='col'>
                                <label htmlFor='operador' className='form-label'>Operador</label>
                                <input value={operador} onChange={(e) => { setOperador(e.target.value) }} type="text" className='form-control' disabled />
                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div className='col'>
                                <label htmlFor='turno' className='form-label'>Turno</label>
                                <select value={turno} onChange={(e) => { setTurno(e.target.value) }} type="text" className='form-control'>
                                    <option value="">Selecionar...</option>
                                    <option value="DIA">DIA</option>
                                    <option value="NOCHE">NOCHE</option>
                                </select>
                            </div>
                            <div className='col'>
                                <label htmlFor='serviceType' className='form-label'>Tipo de servicio</label>
                                <select value={serviceType} onChange={handleServicioChange} type="text" className='form-control' >
                                    <option value="">Selecionar...</option>
                                    <option value="LAMPON">LAMPON</option>
                                    <option value="RASTRA">RASTRA</option>
                                    <option value="MONTACARGA">MONTACARGA</option>
                                </select>
                            </div>
                        </div>

                        <div className='row mt-4 text-center'>

                            <div className='col'>
                                <label htmlFor='eshora' className='form-label'>
                                    <input type="checkbox" checked={esHora} onChange={manejarCambioCheckbox} />
                                    ¿Es hora?
                                </label>
                            </div>

                            <div className='col'>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                    />
                                    50%
                                </label>
                            </div>

                            <div className='col'>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={isChecked2}
                                        onChange={handleCheckboxChange2}
                                    />
                                    100%
                                </label>
                            </div>


                        </div>

                        <div className='row mt-2'>
                            <div className='col'>
                                <label htmlFor='inicio' className='form-label'>Inicio</label>
                                <input type={esHora ? "time" : "number"} value={inicio} onChange={handleInicioChange} className='form-control' />
                            </div>
                            <div className='col'>
                                <label htmlFor='fin' className='form-label'>Fin</label>
                                <input type={esHora ? "time" : "number"} value={fin} onChange={handleFinChange} className='form-control' />
                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div className='col'>
                                <label htmlFor='total' className='form-label'>Total</label>
                                <input value={!esHora ? total : total} onChange={(e) => { setTotal(e.target.value) }} type="number" className='form-control' disabled={!esHora} />
                            </div>
                            <div className='col'>
                                <label htmlFor='tarifa' className='form-label'>Tarifa</label>
                                <input value={tarifa} onChange={(e) => { setTarifa(e.target.value) }} type="number" className='form-control' readOnly disabled />
                            </div>
                        </div>
                        <div className="col text-center mt-2">
                            <button className='btn btn-success col'>Guardar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddControlTrabajo;