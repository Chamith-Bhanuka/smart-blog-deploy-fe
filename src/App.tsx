import { AuthProvider } from './context/authContext';
import Router from './routes/Router';

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
