import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useUser();
  const navigate = useNavigate();

  function handleLogin() {
    login({
      id: '1',
      name: 'Thomas',
      email: 'thomas@example.com',
      postalCode: '75000'
    });

    navigate('/dashboard');
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
}
