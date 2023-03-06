import { AuthProvider } from './Context/AuthContext';
import Router from './Routes';

function App() {
  return (
    <div>
      <AuthProvider>
      <Router />
      </AuthProvider>
    </div>
  );
}

export default App;
