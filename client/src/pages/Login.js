import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthIllustration from 'components/AuthIllustration';
import AlertMessage from 'components/AlertMessage';

const Login = () => {
    let navigate = useNavigate();

    // show a success alert message if signupSuccess
    // exists in the query parameter
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let signupSuccess = params.get('signupSuccess');

    // States for the login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErroMsg] = useState("");

    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setErroMsg("Please enter all the fields");
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
            // send a post request to the server
            (async () => {
                const rawResponse = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email, password: password })
                });
                const content = await rawResponse.json();
                console.log(content);
                // stop the progress bar
                setSubmitted(false);
                // check if there is an error in the response
                if (content.error) {
                    setErroMsg(content.message);
                    setError(true);
                } else {
                    // redirect to login page
                    navigate("/dashboard/customers");
                }
            })();
        }
    }

    return (
        <div className="row mt-5">
            <AuthIllustration />
            <div className="col-sm-4">
                {
                    // show a success alert message if signupSuccess
                    // exists in the query parameter
                    (signupSuccess) ? (
                        <AlertMessage
                            message="Account created successflly. Login to continue."
                            category="success"
                        />
                    ) : ""
                }

                <div className="login-form">
                    <h5 className="text-center font-weight-bold">Login to your account</h5>
                    <form className="mt-4">
                        <div className="form-group">
                            <input onChange={handleEmail} value={email} type="text" name="email" placeholder="Email" className="form-control" />
                        </div>
                        <div className="form-group">
                            <input onChange={handlePassword} value={password} type="password" name="password" placeholder="Password" className="form-control" />
                        </div>

                        {
                            // show the alert message if the fields are left empty
                            (error) ? (
                                <div className="alert alert-danger">
                                    {errorMsg}
                                </div>
                            ) : ""
                        }

                        {
                            // show the progress bar if data is submited and being processed
                            (submitted) ? (
                                <div className="progress">
                                    <div className="progress-bar progress-bar-striped progress-bar-animated"
                                        role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                                        style={{ width: "100%" }}>
                                    </div>
                                </div>
                            ) : ""
                        }

                        <div className="form-group mt-4 mb-4">
                            <button onClick={handleSubmit} type="submit" className="btn btn-primary form-control">LOG IN</button>
                        </div>
                        <p className="text-center"><a href="/">Forgot your password?</a></p>
                    </form>
                </div>
                <p className="text-center" style={{ 'background': '#ccd9f8', 'padding': '5px', 'borderRadius': '10px' }}>
                    New user? <Link to="/signup">Create an account</Link>
                </p>
            </div>
        </div>
    )
}

export default Login;
