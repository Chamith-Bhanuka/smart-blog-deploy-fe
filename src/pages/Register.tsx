import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/auth';

export default function Register() {
  const [firstName, setFirstName] = useState('firstName');
  const [lastName, setLastName] = useState('lastName');
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('1234');
  const [role, setRole] = useState('USER');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError('');

    try {
      await register(firstName, lastName, email, password, role);
      navigate('/login');
    } catch (error: any) {
      setError(error?.response?.data?.message || 'Registration failed.!');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Register</h1>

        {error && <div className="mb-2 text-red-600">{error}</div>}

        <input
          className="border p-2 w-full mb-3"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="USER">USER</option>
          <option value="AUTHOR">AUTHOR</option>
        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </div>
    </div>
  );
}
