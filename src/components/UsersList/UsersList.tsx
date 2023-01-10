import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchUsers } from '../../store/actionCreators/actionCreators';
import './UserList.css';

const UsersList = () => {
    const { users, isLoading, error } = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if (isLoading) {
        return <h2>Загрузка...</h2>
    }

    if (error) {
        return <h2>{error}</h2>
    }

    return (
        <div className="users">
            {users.map(el => (
                <div key={el.id} className="usercard">
                    <h3 className="username">Name: {el.name}</h3>
                    <h4 className="useremail">Email: {el.email}</h4>
                </div>
            ))
            }
        </div>

    );
};

export default UsersList;