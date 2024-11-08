import { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { GlobalContext } from '@/context/GlobalContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(GlobalContext);

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