import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../../store/userSlice';
import { AppDispatch, RootState } from '../../store/store';
import Link from 'next/link';
import { toast } from 'react-toastify'; // You might need to install this package

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteUser(id)).unwrap();
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error(error || 'Failed to delete user');
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <Link href="/users/create" className="btn-primary">
          Create User
        </Link>
      </div>

      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div className="text-red-500">Error: {error}</div>}

      {status === 'succeeded' && (
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user.id} className="py-4 flex justify-between items-center">
              <span className="text-lg">{user.username} - {user.phone}</span>
              <div className="space-x-2">
                <Link href={`/users/${user.id}/edit`} className="btn-secondary">
                  Edit
                </Link>
                <button onClick={() => handleDelete(user.id)} className="btn-danger">
                  Delete
                </button>
                <Link href={`/profiles/${user.id}/view`} className="btn-primary">
                  View Profile
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
