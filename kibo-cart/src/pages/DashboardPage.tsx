
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    
    function handleLogout() {
        logout();
        navigate('/', { replace: true });
    }
    
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Hello, {user?.name}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
