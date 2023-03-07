import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';

function ListControl() {

    const { user } = useContext(AuthContext);

    const [datos, setDatos] = useState([]);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    const obtenerServicios = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/maquinaria', {
                headers: {
                    Authorization: `bearer ${user.token}`
                },
                params: {
                    fechaInicio,
                    fechaFin
                }
            });

            setDatos(response?.data.servicios || []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fechaActual = new Date();
        const primerDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
        const ultimoDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);
        setFechaInicio(primerDiaDelMes.toISOString().slice(0, 10));
        setFechaFin(ultimoDiaDelMes.toISOString().slice(0, 10));
    }, []);

    const handleBuscarClick = () => {
        obtenerServicios();
    };

    return (
        <>
            <div className='container'>
                <div className="row mt-3">
                    <div className="col-md-2">
                        <Link to={"agregar"}><button className='btn btn-success mt-3'>Agregar Servicio</button></Link>
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="fechaInicio">Fecha de inicio:</label>
                        <input type="date" id="fechaInicio" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} className="form-control" />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="fechaFin">Fecha de fin:</label>
                        <input type="date" id="fechaFin" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} className="form-control" />
                    </div>
                    <div className="col-md-2">
                        <button className='btn btn-primary mt-4' onClick={handleBuscarClick}>Buscar</button>
                    </div>
                </div>
                <hr />
                <div className='table-responsive'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">N° Control</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Cliente</th>
                                <th scope="col">Almacen</th>
                                <th scope="col">Maquina</th>
                                <th scope="col">Turno</th>
                                <th scope="col">Servicio</th>
                                <th scope="col">Inicio</th>
                                <th scope="col">Fin</th>
                                <th scope="col">Total</th>
                                <th scope="col">Tarifa</th>
                                <th scope="col">Pago</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos !== null ? (
                                datos.map((servicio) => (
                                    <tr key={servicio._id}>
                                        <td>{servicio.numeroControl}</td>
                                        <td>{servicio.fecha.substring(0, 10)}</td>
                                        <td>{servicio.cliente}</td>
                                        <td>{servicio.almacen}</td>
                                        <td>{servicio.maquina}</td>
                                        <td>{servicio.turno}</td>
                                        <td>{servicio.serviceType}</td>
                                        <td>{servicio.inicio}</td>
                                        <td>{servicio.fin}</td>
                                        <td>{servicio.total}</td>
                                        <td>{servicio.tarifa}</td>
                                        <td>{servicio.payO}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan='12'>No hay datos disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ListControl;
