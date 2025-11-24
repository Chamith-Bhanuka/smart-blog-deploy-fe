import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { getMyDetails, login } from '../../services/auth';

export default function Login() {
  const [email, setEmail] = useState('adminone@example.com');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    try {
      const res = await login(email, password);
      localStorage.setItem('accessToken', res.accessToken);
      const me = await getMyDetails();
      const userData = me.data;
      console.log(userData);
      setUser({
        firstName: userData.firstName,
        email: userData.email,
        role: Array.isArray(userData.role) ? userData.role : [userData.role],
        approved: userData.approved,
      });
      navigate('/home');
    } catch (error: any) {
      setError(error?.response?.data?.message || 'Login failed.!');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        {error && <div className="mb-2 text-red-600">{error}</div>}

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-sm text-gray-600 mt-3">
          No account?
          <a href="/register" className="text-blue-600">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
