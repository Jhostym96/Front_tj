import React, { useEffect, useState } from 'react'
import SingleControl from '../SingleControl';
import { Link } from 'react-router-dom';
import axios from 'axios'

function ListControl() {

    const [datacontroltrabajo, setdatacontroltrabajo] = useState([])

    useEffect(() => {

        axios.get('https://siswebtjbackend-production.up.railway.app/api/controltrabajo/obtenercontroltrabajo').then(res => {
            console.log(res.data)
            setdatacontroltrabajo(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    // Mapear listadeusuarios en objeto usuario
    const listacontroltrabajo = datacontroltrabajo.map(controltrabajo => {
        return (
            <SingleControl controltrabajo={controltrabajo} />
        )
    })
    return (
        <>
            <div className='container'>

                <Link to={"/agregarcontroltrabajo"}><button className='btn btn-success mt-3'>Agregar Servicio</button></Link>
                <div className='table-responsive'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">N° Control</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Cliente</th>
                                <th scope="col">Almacen</th>
                                <th scope="col">Maquina</th>
                                <th scope="col">Operador</th>
                                <th scope="col">Turno</th>
                                <th scope="col">Inicio</th>
                                <th scope="col">Fin</th>
                                <th scope="col">Total</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        {listacontroltrabajo}
                    </table>
                </div>
            </div>
        </>
    )
}

export default ListControl;