import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { AppDispatch } from '../store/store';
import { createProfile, updateProfile } from '../store/profileSlice';

// Define a Profile type
interface Profile {
  userId: number; // Ensure userId is included here
  email: string;
  gender: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
}

interface ProfileFormProps {
  defaultValues?: Profile;
  isEdit: boolean;
  userId: number; // Ensure userId is passed as a prop
  onCancel?: () => void;
  onSubmit?: (data: Profile) => Promise<void>;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ defaultValues, isEdit, userId, onCancel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit } = useForm<Profile>({ defaultValues });

  const onSubmit = async (data: Profile) => {
    try {
      if (isEdit) {
        await dispatch(updateProfile({ userId, profileData: data })); // Ensure userId is included
      } else {
        await dispatch(createProfile({ ...data, userId })); // Ensure userId is included
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
