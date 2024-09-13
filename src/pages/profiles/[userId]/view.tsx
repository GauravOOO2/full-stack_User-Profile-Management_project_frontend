import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileByUserId, deleteProfile } from '../../../store/profileSlice';
import { AppDispatch, RootState } from '../../../store/store';
import ProfileForm from '../../../components/ProfileForm';
import Link from 'next/link';

const ViewProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { userId } = router.query;
  const { profiles, status } = useSelector((state: RootState) => state.profile);
  const [isEditing, setIsEditing] = useState(false);

  const profile = profiles.find(p => p.userId === Number(userId));

  useEffect(() => {
    if (userId && !profile && status !== 'loading') {
      dispatch(fetchProfileByUserId(Number(userId)));
    }
  }, [dispatch, userId]);

  if (!userId || status === 'loading') return <div>Loading...</div>;

  if (!profile) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        <div className="mb-4">No profile found for this user.</div>
        <Link 
          href={`/profiles/${userId}/create`} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out inline-block"
        >
          Create Profile
        </Link>
      </div>
    );
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this profile?')) {
      await dispatch(deleteProfile(Number(userId)));
      router.push('/users');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {isEditing ? (
        <ProfileForm 
          defaultValues={profile} 
          isEdit={true} 
          userId={Number(userId)} 
          onCancel={handleCancel} 
        />
      ) : (
        <div>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Gender:</strong> {profile.gender}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Pincode:</strong> {profile.pincode}</p>
          <p><strong>City:</strong> {profile.city}</p>
          <p><strong>State:</strong> {profile.state}</p>
          <p><strong>Country:</strong> {profile.country}</p>
          <button 
            onClick={() => setIsEditing(true)} 
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Edit Profile
          </button>
          <button 
            onClick={handleDelete} 
            className="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-4"
          >
            Delete Profile
          </button>
        </div>
      )}
      <Link href="/users" className="text-blue-500 mt-4 block">
        Back to Users
      </Link>
    </div>
  );
};

export default ViewProfile;
