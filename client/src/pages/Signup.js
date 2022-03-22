import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthIllustration from 'components/AuthIllustration';


const Signup = () => {
    let navigate = useNavigate();

    // States for registration
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErroMsg] = useState("");

    // Handling the name change
    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };

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
        if (name === '' || email === '' || password === '') {
            setErroMsg("Please enter all the fields");
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
            // send a post request to the server
            (async () => {
                const rawResponse = await fetch('/api/auth/register', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({name: name, email: email, password: password})
                });
                const content = await rawResponse.json();
                console.log(content);
                // stop the progress bar
                setSubmitted(false);
                // check if there is an error in the response
                if(content.error){
                    setErroMsg(content.message);
                    setError(true);
                }else{
                    // redirect to login page
                    navigate("/login?signupSuccess=true");
                }                
            })();
        }
    }

    return (
        <div className="row mt-5">
            <AuthIllustration />
            <div className="col-sm-4">
                <div className="login-form">
                    <h5 className="text-center font-weight-bold">Create an account</h5>
                    <form className="mt-4" method="POST">
                        <div className="form-group">
                            <input onChange={handleName} value={name} type="text" name="name" placeholder="Full Name" className="form-control" />
                        </div>
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
                                        style={{width: "100%"}}>
                                    </div>
                                </div>
                            ) : ""
                        }

                        <div className="form-group mt-4 mb-4">
                            <button onClick={handleSubmit} type="submit" className="btn btn-primary form-control">SIGN UP</button>
                        </div>
                    </form>
                </div>
                <p className="text-center" style={{ 'background': '#ccd9f8', 'padding': '5px', 'borderRadius': '10px' }}>
                    Have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup;
