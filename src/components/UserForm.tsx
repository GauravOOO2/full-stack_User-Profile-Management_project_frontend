import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { createUser, updateUser } from '../store/userSlice';

interface UserFormProps {
  defaultValues?: { username: string; phone: string };
  isEdit?: boolean;
  userId?: number;
}

const UserForm = ({ defaultValues = { username: '', phone: '' }, isEdit = false, userId }: UserFormProps) => {
  const { register, handleSubmit, reset } = useForm({ defaultValues });
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const onSubmit = async (data: { username: string; phone: string }) => {
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
          className="border border-gray-300 p-2 w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
        <input
          {...register('phone')}
          id="phone"
          className="border border-gray-300 p-2 w-full"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {isEdit ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default UserForm;
