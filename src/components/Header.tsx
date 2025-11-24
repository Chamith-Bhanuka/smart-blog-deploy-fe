import { useAuth } from '../context/authContext.js';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-600 text-white p-4 flex justify-between items-center shadow-md z-50">
      <div className="flex space-x-6">
        <Link to="/home" className="hover:underline">
          Home
        </Link>
        <Link to="/blog" className="hover:underline">
          Posts
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <span>{user?.email}</span>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-500 px-2 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
