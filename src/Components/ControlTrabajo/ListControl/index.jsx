import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';

function ListControl() {

    const { user } = useContext(AuthContext);

    const [datos, setDatos] = useState(null);


    const todosLosServicios = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/maquinaria', {
                headers: {
                    Authorization: `bearer ${user.token}`
                }
            })

            setDatos(response?.data.servicios);

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        todosLosServicios();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return (
        <>

            <div className='container'>

                <Link to={"agregar"}><button className='btn btn-success mt-3'>Agregar Servicio</button></Link>
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
                        {datos !== null
                            ? datos.map((datos) => (
                                <tbody key={datos?._id}>
                                    <tr>
                                        <td>{datos.numeroControl}</td>
                                        <td>{datos.fecha.substring(0, 10)}</td>
                                        <td>{datos.cliente}</td>
                                        <td>{datos.almacen}</td>
                                        <td>{datos.maquina}</td>
                                        <td>{datos.turno}</td>
                                        <td>{datos.serviceType}</td>
                                        <td>{datos.inicio}</td>
                                        <td>{datos.fin}</td>
                                        <td>{datos.total}</td>
                                        <td>{datos.tarifa}</td>
                                        <td>{datos.payO}</td>
                                    </tr>
                                </tbody>
                            ))
                            : "no hay datos"}

                    </table>
                </div>
            </div>
        </>
    )
}

export default ListControl;