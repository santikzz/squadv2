import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {

    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;