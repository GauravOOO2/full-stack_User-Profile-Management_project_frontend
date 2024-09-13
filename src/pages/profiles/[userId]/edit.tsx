import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfiles } from '../../../store/profileSlice';
import { AppDispatch, RootState } from '../../../store/store';
import ProfileForm from '../../../components/ProfileForm';
import { useRouter } from 'next/router';

const EditProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profiles } = useSelector((state: RootState) => state.profile);
  const router = useRouter();
  const { userId } = router.query;

  const profile = profiles.find((profile) => profile.userId === Number(userId));

  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfiles());
    }
  }, [dispatch, profile]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <ProfileForm defaultValues={profile} isEdit userId={Number(userId)} />
    </div>
  );
};

export default EditProfile;
