import { Link, useNavigate } from 'react-router-dom';

import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { authServiceFactory } from '../../services/authService';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: false, ["serverErrors"]: false });
    };
    const { setUserData } = useContext(AuthContext);

    const navigate = useNavigate();
    const [auth, setAuth] = useLocalStorage('auth', {});
    const authService = authServiceFactory(auth.accessToken)

    const [errors, setErrors] = useState({
        email: false,
        password: false,
        rePass: false,
        serverErrors: false
    });





    const onLoginHandler = (e) => {
        if (e.target.name === 'email') {
            const emailRegexValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!e.target.value.match(emailRegexValidator)) {
                setErrors(errors => ({ ...errors, [e.target.name]: true }));
            } else {
                setErrors(errors => ({ ...errors, [e.target.name]: false }));

            }
        }
        if (e.target.name === 'password') {
            if ((e.target.value).length < 6 || (e.target.value).length > 12) {
                setErrors(errors => ({ ...errors, [e.target.name]: true }));
            } else {
                setErrors(errors => ({ ...errors, [e.target.name]: false }));
            }
        }
    }


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const userData = await authService.login(formData)
            setUserData(userData);
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <section id="login-page" className="auth">
            <form id="login" method="POST" onSubmit={onSubmitHandler}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Login</h1>
                    <div className="errors-container">
                        {(errors.title || errors.password || errors.rePass) &&
                            <div className='errors'>
                                {errors.email &&
                                    <p className="error" >
                                        Email is invalid! Try another one!
                                    </p>}
                                {errors.password &&
                                    <p className="error" >
                                        Password must be between 6 and 12 characters!
                                    </p>}
                                {errors.rePass &&
                                    <p className="error" >
                                        Repass must equal password!
                                    </p>}

                            </div>}
                    </div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@abv.bg"
                        onChange={onChangeHandler}
                        onBlur={onLoginHandler}
                    />

                    <label htmlFor="login-pass">Password:</label>
                    <input
                        type="password"
                        id="login-password"
                        name="password"
                        onChange={onChangeHandler}
                        onBlur={onLoginHandler}
                    />
                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>If you don't have profile click <Link to="/auth/register">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}


// export default withAuth(Login);