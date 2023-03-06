import { Outlet } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";


const MainLayout = () => {

    const { user, logout } = useContext(AuthContext);

    return (
        <>
            <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark" className='p-2'>

                <Navbar.Brand as={NavLink} to={"/"}>
                    Bienvenido {user.name}
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className='me-auto'>
                        <Nav.Link as={NavLink} to={"/servicios"}>Servicios</Nav.Link>
                    </Nav>

                    <Nav>
                        <Nav.Link as={NavLink} to={"/account"}>Mi cuenta</Nav.Link>
                        <Nav.Link onClick={logout}>Cerrar sesion</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Outlet />
        </>
    );
};

export default MainLayout;
