import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../../store/userSlice';
import { AppDispatch, RootState } from '../../store/store';
import Link from 'next/link';
import { toast } from 'react-toastify';
import ConfirmationPopup from '../../components/ConfirmationPopup';

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status, error } = useSelector((state: RootState) => state.user);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleDeleteClick = (id: number) => {
    setUserToDelete(id);
    setIsDeletePopupOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (userToDelete) {
      try {
        await dispatch(deleteUser(userToDelete)).unwrap();
        toast.success('User deleted successfully');
      } catch (error) {
        toast.error(error || 'Failed to delete user');
      }
    }
    setIsDeletePopupOpen(false);
    setUserToDelete(null);
  };

  const handleDeleteCancel = () => {
    setIsDeletePopupOpen(false);
    setUserToDelete(null);
  };

  if (status === 'loading') {
    return <div className="text-xl">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-xl text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-start mb-8">
        <h1 className="text-3xl font-bold">Users</h1>
        <Link href="/users/create" className="bg-blue-500 text-white ml-4 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300">
          Create User
        </Link>
      </div>

      <table className="w-full text-lg">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="text-left py-4">Username</th>
            <th className="text-left py-4">Phone</th>
            <th className="text-right py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-100">
              <td className="py-4">{user.username}</td>
              <td className="py-4">{user.phone}</td>
              <td className="py-4 text-right">
                <Link href={`/users/${user.id}/edit`} className="text-blue-500 mr-4 hover:text-blue-700">
                  <span className="text-xl">✏️</span>
                </Link>
                <button onClick={() => handleDeleteClick(user.id)} className="text-red-500 mr-4 hover:text-red-700">
                  <span className="inline-block w-6 h-6 bg-red-500 text-white rounded-full text-center leading-5">&times;</span>
                </button>
                <Link href={`/profiles/${user.id}/view`} className="text-green-500 hover:text-green-700 font-medium">
                  View Profile
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmationPopup
        isOpen={isDeletePopupOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        message="Are you sure you want to delete this user?"
      />
    </div>
  );
};

export default UserList;
