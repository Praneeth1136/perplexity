import { useSelector } from 'react-redux';
import { useChat } from "../hooks/useChat";
import { useEffect } from 'react';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const chat = useChat()

  useEffect(() => {
    chat.initializeSocketConnection()
  }, [])

  return (
    <>
      <h1>Dashboard Page</h1>
      {user ? <p>Welcome, {user.username}</p> : <p>Loading user...</p>}
    </>
  );
};

export default Dashboard;