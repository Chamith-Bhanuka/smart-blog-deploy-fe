import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { approveAuthor, getAllUsers, registerAdmin } from '../../services/auth';

export default function AdminPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user?.role?.includes('ADMIN')) {
      navigate('/home');
      return;
    }
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setError('');

    try {
      const res = await getAllUsers();
      console.log(res);
      setUsers(res || []);
    } catch (error: any) {
      setError(error?.response?.data?.message || 'Failed to fetch users.!');
    }
  };

  const handleApprove = async (id: string) => {
    setError('');

    try {
      await approveAuthor(id);
      await fetchUsers();
    } catch (error: any) {
      setError(error?.response?.data?.message || 'Failed to approve author.!');
    }
  };

  const handleRegisterAdmin = async () => {
    setError('');
    try {
      await registerAdmin(form);
      setForm({ firstName: '', lastName: '', email: '', password: '' });
      await fetchUsers();
    } catch (error: any) {
      setError(error?.response?.data?.message || 'Failed to register admin!');
    }
  };

  const pendingAuthors = users.filter((u: any) => {
    const roles = Array.isArray(u.role) ? u.role : [u.role];
    const isAuthor = roles.some(
      (r: any) => String(r).toLowerCase() === 'author'
    );
    const isPending =
      String(u.approved ?? 'pending').toLowerCase() === 'pending';
    return isAuthor && isPending;
  });

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      {error && <div className="mb-3 text-red-600">{error}</div>}

      <div className="mb-8">
        <h3 className="font-semibold mb-2">Register New Admin</h3>
        <div className="flex flex-wrap gap-2">
          <input
            className="border p-2 flex-1 min-w-[180px]"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <input
            className="border p-2 flex-1 min-w-[180px]"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
          <input
            className="border p-2 flex-1 min-w-[220px]"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="border p-2 flex-1 min-w-[180px]"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <button
          onClick={handleRegisterAdmin}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Admin
        </button>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Pending Authors</h3>
        {pendingAuthors.length === 0 ? (
          <p className="text-gray-600">No pending authors.</p>
        ) : (
          pendingAuthors.map((u) => (
            <div
              key={u._id}
              className="flex justify-between items-center mb-2 border p-2 rounded"
            >
              <span>{u.email}</span>
              <button
                onClick={() => handleApprove(u._id)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Approve
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
