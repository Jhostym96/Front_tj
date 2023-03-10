import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddControlTrabajo from "../Components/ControlTrabajo/AddControl";
import { MainLayout } from "../Layouts";
import { AsistenciaView, HomeView, LoginView, RegisterView, ServiciosView } from "../Pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomeView />} />
          <Route path="/servicios" element={<ServiciosView />} />
          <Route path="/servicios/agregar" element={<AddControlTrabajo />} />
          <Route path="/asistencia" element={<AsistenciaView />} />
        </Route>

        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
