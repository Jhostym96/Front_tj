import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';

function ListAsistencia() {

    const { user } = useContext(AuthContext);

    const [datos, setDatos] = useState([]);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    const obtenerServicios = async () => {
        try {
            const response = await axios.get('https://back-tj.onrender.com/api/v1/asistencia', {
                headers: {
                    Authorization: `bearer ${user.token}`
                },
                params: {
                    fechaInicio,
                    fechaFin
                }
            });
            const nuevosDatos = response?.data.reporte || [];
            setDatos(nuevosDatos);
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleBuscarClick = () => {
        obtenerServicios();
    };

    return (
        <div className='container'>
            <div className="row mt-3">
                <div className="col-md-2">
                    <Link to={"agregar"}><button className='btn btn-success mt-3'>Agregar Asistencia</button></Link>
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
                            <th scope="col">Fecha</th>
                            <th scope="col">Trabajo</th>
                            <th scope="col">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos !== null ? (
                            datos.map((asistencia) => (
                                <tr key={asistencia._id}>
                                    <td>{asistencia.fecha.substring(0, 10)}</td>
                                    <td>{asistencia.cliente}</td>
                                    <td>{asistencia.estado}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan='1'>No hay datos disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListAsistencia;
