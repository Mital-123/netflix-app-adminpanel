import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function Register() {

    const [obj, setobj] = useState({});
    const [blankobj, setblankobj] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [users, setUsers] = useState([]);
    const [profilePreview, setProfilePreview] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("https://netflixbackend-dcnc.onrender.com/users");
            setUsers(res.data);
            console.log(res.data);

        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    const registerdata = (e) => {
        const { name, value, files } = e.target;

        if (name === "profile") {
            const file = files[0];
            if (file) {
                obj[name] = file;
                setProfilePreview(URL.createObjectURL(file));
                errorMessage[name] = "";
            } else {
                errorMessage[name] = "Profile is required!";
            }
        } else {
            obj[name] = value;
            blankobj[name] = "";

            if (name === "name") {
                if (!value) {
                    errorMessage[name] = "Name is required!";
                } else if (!/^[a-zA-Z ]{1,40}$/.test(value)) {
                    errorMessage[name] = "Name must be alphabet only.";
                } else {
                    errorMessage[name] = "";
                }
            }

            if (name === "email") {
                if (!value) {
                    errorMessage[name] = "E-mail is required!";
                } else if (!value.includes("@gmail") && !value.includes("@outlook")) {
                    errorMessage[name] = "E-mail not valid.";
                } else {
                    errorMessage[name] = "";
                }
            }

            if (name === "phnumber") {
                if (!value) {
                    errorMessage[name] = "Phone Number is required!";
                } else if (value.length !== 10) {
                    errorMessage[name] = "Phone Number must be 10 digits.";
                } else {
                    errorMessage[name] = "";
                }
            }

            if (name === "password") {
                if (!value) {
                    errorMessage[name] = "Password is required!";
                } else if (value.length < 6) {
                    errorMessage[name] = "Password must be six characters.";
                } else {
                    errorMessage[name] = "";
                }
            }

            if (name === "subscription") {
                errorMessage[name] = "";
            }
        }

        setobj({ ...obj });
        setblankobj({ ...blankobj });
        setErrorMessage({ ...errorMessage });
    };

    const registerSavedata = async () => {
        let isValid = true;

        if (!obj.name) {
            errorMessage.name = "Name is required!";
            isValid = false;
        }

        if (!obj.email) {
            errorMessage.email = "E-mail is required!";
            isValid = false;
        }

        if (!obj.phnumber) {
            errorMessage.phnumber = "Phone Number is required!";
            isValid = false;
        }

        if (!obj.password) {
            errorMessage.password = "Password is required!";
            isValid = false;
        }

        if (!obj.subscription) {
            errorMessage.subscription = "Please select a subscription plan.";
            isValid = false;
        }

        if (!obj.profile) {
            errorMessage.profile = "Profile is required!";
            isValid = false;
        }

        const emailExists = users.some(user => user.email === obj.email);
        if (emailExists) {
            errorMessage.email = "E-mail already exists!";
            isValid = false;
        }

        setErrorMessage({ ...errorMessage });

        if (!isValid) return;

        const formData = new FormData();
        Object.keys(obj).forEach(key => formData.append(key, obj[key]));

        try {
            const res = await axios.post("https://netflixbackend-dcnc.onrender.com/registration", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(res.data);
            Swal.fire({
                icon: 'success',
                title: 'Successfull',
                text: '✅ Registration successfully!',
                timer: 500,
                showConfirmButton: false,
            });
            fetchUsers();
            setobj({ ...blankobj });
            setProfilePreview(null);
            setErrorMessage({});
            navigate("/");
        } catch (err) {
            console.error("Error during registration:", err);
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: '❌ Something went wrong. Please try again.',
            });
        }
    };

    return (
        <>
            <div className="container min-vh-100 d-flex align-items-center justify-content-center p-4">
                <div className="row w-100 align-items-center">

                    <div className="col-12 col-lg-6 mb-4 mb-lg-0 text-center">
                        <img src={require("../assets/Image/sign-up-concept-illustration_114360-7965-removebg-preview-removebg-preview.png")} alt="" className="img-fluid w-100 object-fit-cover" style={{ maxHeight: "500px" }} />
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className='shadow rounded-5 w-100 p-4 mx-auto' style={{ maxWidth: '600px', border: "8px double black" }}>
                            <h2 className='fw-bold text-center'>Sign Up</h2>
                            <form className='w-100'>
                                <div className='row'>
                                    <div className='col-12 col-md-6 mb-3 mt-2'>
                                        <label className='fw-bold'>Name</label>
                                        <input type="text" name="name" className='d-block mt-1 w-100 border border-dark rounded py-1 px-2' onChange={registerdata} value={obj?.name || ''} style={{ outline: "none", background: "rgb(245 245 245 / 41%)" }} />
                                        <div className='text-danger fw-medium'>{errorMessage.name}</div>
                                    </div>
                                    <div className='col-12 col-md-6 mb-3 mt-2'>
                                        <label className='fw-bold'>E-mail</label>
                                        <input type="text" name="email" className='d-block mt-1 w-100 border border-dark rounded py-1 px-2' onChange={registerdata} value={obj?.email || ''} style={{ outline: "none", background: "rgb(245 245 245 / 41%)" }} />
                                        <div className='text-danger fw-medium'>{errorMessage.email}</div>
                                    </div>
                                    <div className='col-12 col-md-6 mb-3'>
                                        <label className='fw-bold'>Phone Number</label>
                                        <input type="number" name="phnumber" className='d-block mt-1 w-100 border border-dark rounded py-1 px-2' onChange={registerdata} value={obj?.phnumber || ''} style={{ outline: "none", background: "rgb(245 245 245 / 41%)" }} />
                                        <div className='text-danger fw-medium'>{errorMessage.phnumber}</div>
                                    </div>
                                    <div className='col-12 col-md-6 mb-3'>
                                        <label className='fw-bold'>Password</label>
                                        <input type="text" name="password" className='d-block mt-1 w-100 border border-dark rounded py-1 px-2' onChange={registerdata} value={obj?.password || ''} style={{ outline: "none", background: "rgb(245 245 245 / 41%)" }} />
                                        <div className='text-danger fw-medium'>{errorMessage.password}</div>
                                    </div>
                                    <div className='col-12 mb-3'>
                                        <label className='fw-bold'>SubScription</label>
                                        <div className='d-lg-flex d-md-flex gap-4 mt-1 w-100'>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input border border-dark"
                                                    type="radio"
                                                    name="subscription"
                                                    value="Free"
                                                    checked={obj.subscription === 'Free'}
                                                    onChange={registerdata}
                                                /> <span className='fw-medium'>Free</span>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input border border-dark"
                                                    type="radio"
                                                    name="subscription"
                                                    value="Basic"
                                                    checked={obj.subscription === 'Basic'}
                                                    onChange={registerdata}
                                                /> <span className='fw-medium'>Basic</span>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input border border-dark"
                                                    type="radio"
                                                    name="subscription"
                                                    value="Premium"
                                                    checked={obj.subscription === 'Premium'}
                                                    onChange={registerdata}
                                                /> <span className='fw-medium'>Premium</span>
                                            </div>
                                        </div>
                                        <div className='text-danger fw-medium'>{errorMessage.subscription}</div>
                                    </div>
                                    <div className='col-12 mb-3'>
                                        <label className='fw-bold'>Profile</label>
                                        <input type="file" name="profile" className='d-block mt-1 w-100 border border-dark rounded py-1 px-2' onChange={registerdata} style={{ outline: "none", background: "rgb(245 245 245 / 41%)" }} />
                                        <div className='text-danger fw-medium'>{errorMessage.profile}</div>
                                        {
                                            profilePreview &&
                                            <div className='mt-2'>
                                                <img src={profilePreview} alt="preview" className='img-fluid rounded border' style={{ maxHeight: '80px' }} />
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className='text-center mt-2'>
                                    <button type='button' className="bg-info button_main button--aylen button--border-thin button--round-s fw-bold py-2 px-3 rounded-2" onClick={registerSavedata}>Register</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Register