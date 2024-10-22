import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileByUserId, deleteProfile, updateProfile } from '../../../store/profileSlice';
import { AppDispatch, RootState } from '../../../store/store';
import ProfileForm from '../../../components/ProfileForm';
import Link from 'next/link';
import ConfirmationPopup from '../../../components/ConfirmationPopup';
import { Profile } from '../../../store/profileSlice'; // Import the Profile type

const ViewProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { userId } = router.query;
  const { profiles, status } = useSelector((state: RootState) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  const profile = profiles.find(p => p.userId === Number(userId));

  useEffect(() => {
    if (userId && !profileFetched && status !== 'loading') {
      dispatch(fetchProfileByUserId(Number(userId)));
      setProfileFetched(true);
    }
  }, [dispatch, userId, status, profileFetched]);

  if (!userId || (status === 'loading' && !profileFetched)) return <div>Loading...</div>;

  if (!profile || (profile && Object.values(profile).every(value => value === '' || value === null))) {
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

  const handleDeleteClick = () => {
    setIsDeletePopupOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await dispatch(deleteProfile(Number(userId)));
    router.push('/users');
    setIsDeletePopupOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeletePopupOpen(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (data: Profile) => {
    try {
      await dispatch(updateProfile({ userId: Number(userId), profileData: data })).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-100 border-b flex justify-between items-center">
          <h1 className="text-2xl font-bold">User Profile</h1>
          <div>
            {!isEditing && (
              <>
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  ✏️
                </button>
                <button 
                  onClick={handleDeleteClick} 
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </>
            )}
          </div>
        </div>
        <div className="px-6 py-4">
          {isEditing ? (
            <ProfileForm 
              defaultValues={profile} 
              isEdit={true} 
              userId={Number(userId)} 
              onCancel={handleCancel}
              onSubmit={handleSubmit}
            />
          ) : (
            <div className="space-y-2">
              <p>
                <strong>Username:</strong> {profile.username} {/* Ensure username is accessed correctly */}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Gender:</strong> {profile.gender}
              </p>
              <p>
                <strong>Address:</strong> {profile.address}
              </p>
              <p>
                <strong>Pincode:</strong> {profile.pincode}
              </p>
              <p>
                <strong>City:</strong> {profile.city}
              </p>
              <p>
                <strong>State:</strong> {profile.state}
              </p>
              <p>
                <strong>Country:</strong> {profile.country}
              </p>
            </div>
          )}
        </div>
        <div className="px-6 py-4 bg-gray-100 border-t">
          <Link href="/users" className="text-blue-500 hover:underline">
            Back to Users
          </Link>
        </div>
      </div>
      <ConfirmationPopup
        isOpen={isDeletePopupOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        message="Are you sure you want to delete this profile?"
      />
    </div>
  );
};

export default ViewProfile;
