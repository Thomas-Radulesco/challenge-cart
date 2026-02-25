
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { SecondaryButton } from '../components/common/Buttons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledSecondaryButton = styled(SecondaryButton)`
    && {
        margin: 2em;
    }
`;


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
            <StyledSecondaryButton onClick={logout}>
                Logout
            </StyledSecondaryButton>
            <StyledSecondaryButton component={Link} to="/">
                Back to Shop
            </StyledSecondaryButton>
        </div>
    );
}
