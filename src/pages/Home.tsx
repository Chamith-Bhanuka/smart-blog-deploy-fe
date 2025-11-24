import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  console.log('😎 ', user.data);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <h1 className="text-4xl font-bold mb-2">
        Welcome, {user?.firstName || 'User'}
      </h1>
      <p className="mb-6 text-gray-700">
        Role: {user?.role?.join(', ') || 'Unknown'}
      </p>

      {user?.role?.includes('ADMIN') && (
        <button
          onClick={() => navigate('/admin')}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 mb-4"
        >
          Go to Admin Panel
        </button>
      )}

      <button
        onClick={() => navigate('/blog')}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-4"
      >
        Go to Blog
      </button>

      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
