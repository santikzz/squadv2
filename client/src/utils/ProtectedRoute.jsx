import { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                user ? <Component {...props} /> : <Navigate to="/login" />
            }
        />
    );
};

export default ProtectedRoute;