import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { authServiceFactory } from '../../services/authService'
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';




export const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rePass: ''
    });


    const [errors, setErrors] = useState({
        email: false,
        password: false,
        rePass: false,
        serverErrors: false
    });

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: false, ["serverErrors"]: false });
    };
    const { setUserData } = useContext(AuthContext);

    const navigate = useNavigate();
    const [auth, setAuth] = useLocalStorage('auth', {});
    const authService = authServiceFactory(auth.accessToken)

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const userData = await authService.register(formData)
            setUserData(userData);
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    }


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

    return (
        <section id="register-page" className="auth">
            <form id="register" method="POST" onSubmit={onSubmitHandler}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>
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
                        placeholder="example@mail.bg"
                        onChange={onChangeHandler}
                        onBlur={onLoginHandler}
                    />

                    <label htmlFor="register-pass">Password:</label>
                    <input
                        type="password"
                        id="register-password"
                        name="password"
                        onChange={onChangeHandler}
                        onBlur={onLoginHandler}
                    />
                    <label htmlFor="register-pass">Re-Password:</label>
                    <input
                        type="password"
                        id="rePass"
                        name="rePass"
                        onChange={onChangeHandler}
                        onBlur={onLoginHandler}
                    />
                    <input type="submit" className="btn submit" value="Register" />
                    <p className="field">
                        <span>If you don't have profile click <Link to="/auth/login">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}