import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "../Layouts";
import { HomeView, LoginView, RegisterView, ServiciosView } from "../Pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomeView />} />
          <Route path="/servicios" element={<ServiciosView />} />

        </Route>

        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
