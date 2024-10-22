import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { createUser, updateUser } from '../store/userSlice';

interface User {
  username: string;
  phone: string;
}

interface UserFormProps {
  defaultValues?: { username: string; phone: string };
  isEdit?: boolean;
  userId?: number;
  onCancel?: () => void;
}

const UserForm = ({ defaultValues = { username: '', phone: '' }, isEdit = false, userId, onCancel }: UserFormProps) => {
  const { register, handleSubmit, reset } = useForm<User>({ defaultValues });
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const onSubmit = async (data: User) => {
    if (isEdit && userId) {
      await dispatch(updateUser({ id: userId, userData: data }));
    } else {
      await dispatch(createUser(data));
    }
    reset();
    router.push('/users');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium">Username</label>
        <input
          {...register('username')}
          id="username"
          className="border border-gray-300 p-2 w-full rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
        <input
          {...register('phone')}
          id="phone"
          className="border border-gray-300 p-2 w-full rounded"
          required
        />
      </div>
      <div className="flex space-x-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
          {isEdit ? 'Update' : 'Create'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-300">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
