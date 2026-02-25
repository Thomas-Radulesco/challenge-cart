
import { useUser } from '../contexts/UserContext';
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
    
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Hello, {user?.name}</p>
            <StyledSecondaryButton onClick={logout}>
                Logout
            </StyledSecondaryButton>
            <StyledSecondaryButton as={Link} to="/">
                Back to Shop
            </StyledSecondaryButton>
        </div>
    );
}
