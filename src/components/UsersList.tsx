import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Link from 'next/link';
import { User } from '../store/userSlice'; // Import the User type

const UsersList = () => {
  const { users } = useSelector((state: RootState) => state.user);

  return (
    <ul>
      {users.map((user: User) => ( // Specify the type for user
        <li key={user.id} className="border-b py-2 flex justify-between">
          <span>{user.username} - {user.phone}</span>
          <Link href={`/profiles/${user.id}/view`} className="text-blue-500">
            View/Edit Profile
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default UsersList;
