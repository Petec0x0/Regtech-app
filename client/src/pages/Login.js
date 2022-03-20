import React from 'react';
import { Link } from 'react-router-dom';
import AuthIllustration from 'components/AuthIllustration';

const Login = () => {
    return (
        <div className="row mt-5">
            <AuthIllustration />
            <div className="col-sm-4">
                <div className="login-form">
                    <h5 className="text-center font-weight-bold">Login to your account</h5>
                    <form className="mt-4">
                        <div className="form-group">
                            <input type="text" name="email" placeholder="Email" className="form-control" />
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" placeholder="Password" className="form-control" />
                        </div>
                        <div className="form-group mt-4 mb-4">
                            <button type="submit" className="btn btn-primary form-control">LOG IN</button>
                        </div>
                        <p className="text-center"><a href="/">Forgot your password?</a></p>
                    </form>
                </div>
                <p className="text-center" style={{'background': '#ccd9f8', 'padding': '5px', 'borderRadius': '10px'}}>
                    New user? <Link to="/signup">Create an account</Link>
                </p>
            </div>
        </div> 
    )
}

export default Login;
