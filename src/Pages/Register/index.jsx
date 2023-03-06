import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';



const Register = () => {

  const [name, setName] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/register', {
        name,
        dni,
        email,
        password,
        repassword
      });

      console.log(response)


      Swal.fire({
        icon: "success",
        text: "Usuario creado correctamente",
      })
    }
    catch (error) {

      // console.log(error.response.data.error)
      Swal.fire({
        icon: "error",
        text: Object.values(error.response.data),
      })

      Swal.fire({
        icon: "error",
        text: error.response.data.errors[0].msg,
      })
    }
  };


  return (
    <form className="signup"
      onSubmit={handleSubmit}
      autoComplete="off">
      <h3>Registro</h3>

      <label>Usuario:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>DNI:</label>
      <input
        type="number"
        value={dni}
        onChange={(e) => setDni(e.target.value)}

      />

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label>Repassword:</label>
      <input
        type="password"
        value={repassword}
        onChange={(e) => setRepassword(e.target.value)}

      />

      <button>Register</button>


    </form>
  )
}


export default Register