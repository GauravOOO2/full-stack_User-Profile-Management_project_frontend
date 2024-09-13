import UserForm from '../../components/UserForm';
import { useRouter } from 'next/router';

const CreateUser = () => {
  const router = useRouter();

  const handleCancel = () => {
    router.push('/users');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create User</h1>
      <UserForm onCancel={handleCancel} />
    </div>
  );
};

export default CreateUser;
