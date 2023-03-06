import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';
import Swal from 'sweetalert2';


function SingleControl({ controltrabajo }) {

    const navegar = useNavigate()


    // Para animacion de scroll

    useEffect(() => {
        AOS.init()
    }, [])

    // Funcio para borrar usuario

    function borrarcontrol(idcontrol) {

        axios.post('https://siswebtjbackend-production.up.railway.app/api/controltrabajo/borrarcontroltrabajo', { idcontrol: idcontrol }).then(res => {

            let timerInterval
            Swal.fire({
              title: 'Eliminando!',
              html: 'I will close in <b></b> milliseconds.',
              timer: 2000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft()
                }, 100)
              },
              willClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
              }
            })

            navegar(0)

        }).cath(err => {
            console.log(err)
        })
    }


    return (

        <tbody data-aos="fade-up"
            data-aos-anchor-placement="center-center">
            <tr>
                <td>{controltrabajo.numerocontrol}</td>
                <td>{controltrabajo.fecha}</td>
                <td>{controltrabajo.cliente}</td>
                <td>{controltrabajo.almacen}</td>
                <td>{controltrabajo.maquina}</td>
                <td>{controltrabajo.operador}</td>
                <td>{controltrabajo.turno}</td>
                <td>{controltrabajo.inicio}</td>
                <td>{controltrabajo.fin}</td>
                <td>{controltrabajo.total}</td>

                <td>
                    <Link to={`/editcontrol/${controltrabajo.idcontrol}`}><li className='btn btn-success'>Editar</li></Link>
                    <button className='btn btn-danger' onClick={() => { borrarcontrol(controltrabajo.idcontrol) }}>Borrar</button>
                </td>
            </tr>
        </tbody>

    )
}

export default SingleControl;