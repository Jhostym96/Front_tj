import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';

const Login = () => {

  const { authLogin, isAuth } = useContext(AuthContext);

  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('https://backtj.fly.dev/api/v1/auth/login', { dni, password })

      .then(response => {
        authLogin(response.data); // Le envio al usuario authenticado al AuthContext.

        var token = JSON.stringify(response.data)
        localStorage.setItem('user', token);

        // Almacenar el token de autenticación en el estado de la aplicación

      })
      .catch(error => {
        authLogin()

        Swal.fire({
          icon: "error",
          text: Object.values(error.response.data),
        });

        Swal.fire({
          icon: "error",
          text: error.response.data.errors[0].msg,
        })

      });
  };

  if (isAuth()) return <Navigate to="/" />;


  return (
    <form className="login"
      onSubmit={handleSubmit}
    >
      <h3>Login</h3>

      <label>DNI:</label>
      <input
        type="number"
        value={dni}
        onChange={e => setDni(e.target.value)}
      />

      <label>Password:</label>
      <input
        type="password"
        value={password} onChange={e => setPassword(e.target.value)}
      />
      <button >Login</button>
    </form>
  )
}

export default Login;