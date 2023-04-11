import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export const Header = () => {
    const { user, onLogoutHandler } = useContext(AuthContext);
    return (
        <header>
            <Link to='/'><div className="image-header" ></div></Link>
            <nav>

                {(user != null)
                    ?
                    <div id="user">
                        <span>Hello<Link to="/profile">{user.email}</Link></span>
                        <Link to="/offers">All offers</Link>
                        <Link to="/offers/create">Create Offer</Link>
                        <Link to="/" onClick={onLogoutHandler}>LogOut</Link>
                    </div>

                    :

                    <div id="guest">
                        <Link to="/offers/latest">Latest Offers</Link>
                        <Link to="/auth/login">Login</Link>
                        <Link to="/auth/register">Register</Link>
                    </div>

                }</nav>
        </header>
    )
}