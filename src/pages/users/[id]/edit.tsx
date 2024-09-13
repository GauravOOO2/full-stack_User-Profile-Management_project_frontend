import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../store/userSlice';
import { AppDispatch, RootState } from '../../../store/store';
import UserForm from '../../../components/UserForm';

const EditUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const { id } = router.query;

  const user = users.find((user) => user.id === Number(id));

  useEffect(() => {
    if (!user) {
      dispatch(fetchUsers());
    }
  }, [dispatch, user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <UserForm defaultValues={user} isEdit userId={Number(id)} />
    </div>
  );
};

export default EditUser;
