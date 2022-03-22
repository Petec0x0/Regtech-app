import React, { useState } from 'react';
import AlertMessage from 'components/AlertMessage';

const OnboardCustomer = () => {
    // States for getting customers data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

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

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '') {
            setErroMsg("Please fill all the fields");
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
                    body: JSON.stringify({ name: name, email: email })
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
                    // navigate("/login?signupSuccess=true");
                }
            })();
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                {/* <h1 className="h2">Onboard Customer</h1> */}
            </div>
            <div className="row mt-5 d-flex justify-content-center onboard-container">
                <div className="col-xs-12 col-sm-6 col-lg-4">
                    <AlertMessage 
                        message="Account created successflly. Login to continue."
                        category="success"
                    />
                    <div className="login-form">
                        <h5 className="text-center font-weight-bold">Onboard Customer</h5>
                        <form className="mt-4" method="POST">
                            <div className="form-group">
                                <input onChange={handleName} value={name} type="text" name="name" placeholder="Customer Name" className="form-control" />
                            </div>
                            <div className="form-group">
                                <input onChange={handleEmail} value={email} type="text" name="email" placeholder="Customer Email" className="form-control" />
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
                                <button onClick={handleSubmit} type="submit" className="btn btn-primary form-control">Generate link</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default OnboardCustomer;
