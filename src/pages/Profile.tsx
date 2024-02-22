import { useAuthContext } from "../providers/auth";

const Profile = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <h1>profile</h1>
      <p>name: {user?.displayName}</p>
      <p>gmail: {user?.email}</p>
      <p>photo:</p>
      <img
        src={`${user?.photoURL}`}
        alt=""
        style={{
          width: "300px",
          height: "300px",
          background: "red",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default Profile;
