import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { AppDispatch } from '../store/store';
import { createProfile, updateProfile } from '../store/profileSlice';

interface ProfileFormProps {
  defaultValues?: {
    email: string;
    gender: string;
    address: string;
    pincode: string;
    city: string;
    state: string;
    country: string;
  };
  isEdit: boolean;
  userId: number;
  onCancel?: () => void;
}

const ProfileForm = ({ defaultValues, isEdit, userId, onCancel }: ProfileFormProps) => {
  const { register, handleSubmit } = useForm({ defaultValues });
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    if (isEdit) {
      await dispatch(updateProfile({ userId, profileData: data }));
    } else {
      await dispatch(createProfile({ ...data, userId }));
    }
    router.push(`/profiles/${userId}/view`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input
          {...register('email')}
          id="email"
          className="border border-gray-300 p-2 w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="gender" className="block text-sm font-medium">Gender</label>
        <select {...register('gender')} id="gender" className="border border-gray-300 p-2 w-full">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium">Address</label>
        <input
          {...register('address')}
          id="address"
          className="border border-gray-300 p-2 w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="pincode" className="block text-sm font-medium">Pincode</label>
        <input
          {...register('pincode')}
          id="pincode"
          className="border border-gray-300 p-2 w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium">City</label>
        <input
          {...register('city')}
          id="city"
          className="border border-gray-300 p-2 w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="state" className="block text-sm font-medium">State</label>
        <input
          {...register('state')}
          id="state"
          className="border border-gray-300 p-2 w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="country" className="block text-sm font-medium">Country</label>
        <input
          {...register('country')}
          id="country"
          className="border border-gray-300 p-2 w-full"
          required
        />
      </div>
      <div className="flex space-x-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {isEdit ? 'Update Profile' : 'Create Profile'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="bg-gray-300 text-black px-4 py-2 rounded">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
