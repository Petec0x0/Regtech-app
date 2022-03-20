import React from 'react';
import { Link } from 'react-router-dom';
import AuthIllustration from 'components/AuthIllustration';


const Signup = () => {
    return (
        <div className="row mt-5">
            <AuthIllustration />
            <div className="col-sm-4">
                <div className="login-form">
                    <h5 className="text-center font-weight-bold">Creat an account</h5>
                    <form className="mt-4">
                        <div className="form-group">
                            <input type="text" name="name" placeholder="Full Name" className="form-control" />
                        </div>
                        <div className="form-group">
                            <input type="text" name="email" placeholder="Email" className="form-control" />
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" placeholder="Password" className="form-control" />
                        </div>
                        <div className="form-group mt-4 mb-4">
                            <button type="submit" className="btn btn-primary form-control">SIGN UP</button>
                        </div>
                    </form>
                </div>
                <p className="text-center" style={{'background': '#ccd9f8', 'padding': '5px', 'borderRadius': '10px'}}>
                    Have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div> 
    )
}

export default Signup;
