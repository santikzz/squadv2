import { useContext } from 'react';
import { GlobalContext } from '@/context/GlobalContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {

    const { loading, isAuthenticated } = useContext(GlobalContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;