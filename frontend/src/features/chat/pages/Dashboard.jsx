import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <h1>Dashboard Page</h1>
      {user ? <p>Welcome, {user.username}</p> : <p>Loading user...</p>}
    </>
  );
};

export default Dashboard;