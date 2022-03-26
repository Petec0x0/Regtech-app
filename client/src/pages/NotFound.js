import React from 'react';
import illustration from 'images/not-found-404.svg';
import logo from 'images/logo.png';

const Blank = () => {
    return (
        <div className="container">
            <header>
                <img src={logo} alt='Logo' height={54} width={54} /> <span className='logo-text'>Logo</span>
            </header>

            <div className="container d-flex justify-content-center">
                <img src={illustration} alt="illustration" />

            </div>
            <a href="/" className="btn btn-primary form-control">Return Home</a>
        </div>
    )
}

export default Blank;
