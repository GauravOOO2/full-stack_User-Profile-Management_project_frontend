import ProfileForm from '../../../components/ProfileForm';
import { useRouter } from 'next/router';

const CreateProfile = () => {
  const router = useRouter();
  const { userId } = router.query;

  if (!userId) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create Profile</h1>
      <ProfileForm userId={Number(userId)} />
    </div>
  );
};

export default CreateProfile;
