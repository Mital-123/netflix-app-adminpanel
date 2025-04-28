import React, { useState } from 'react';
import ButtonCom from './Main/ButtonCom';
import { FaMailBulk } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const logedin = async () => {
        try {
            const response = await fetch('https://netflixbackend-dcnc.onrender.com/adminlogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            console.log("API Response:", result);

            if (response.ok && result.success) {
                localStorage.setItem('login', 'true');

                props.setlogin(true);
                navigate('/');
            } else {
                setErrorMessage(result.message || 'Invalid E-mail or Password.');
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div className='login_bg'>
            <div className='container min-vh-100 d-flex align-items-center justify-content-center p-4'>
                <div className='border border-dark border-5 shadow rounded-5 w-100 p-4 mx-auto' style={{ maxWidth: '400px' }}>
                    <h2 className='fw-bold text-center'>LOGIN</h2>
                    <form className='w-100' onSubmit={e => e.preventDefault()}>
                        <div className='row'>
                            <div className='col-12 mb-3'>
                                <label className='fw-bold'><FaMailBulk /> E-mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    className='d-block mt-1 w-100 border border-dark rounded py-1 px-2'
                                    style={{ outline: "none", background: "rgb(245 245 245 / 41%)" }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='col-12 mb-3'>
                                <label className='fw-bold'><RiLockPasswordFill /> Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className='d-block mt-1 w-100 border border-dark rounded py-1 px-2'
                                    style={{ outline: "none", background: "rgb(245 245 245 / 41%)" }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        {errorMessage && (
                            <div className="text-danger text-center mb-3 fw-medium">
                                {errorMessage}
                            </div>
                        )}
                        <div className='text-center mt-2'>
                            <ButtonCom btn="Login" onClick={logedin} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;