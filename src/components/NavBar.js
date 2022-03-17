import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'images/logo.png';

const NavBar = () => {
    return (
        <>
            <nav className="navbar navbar-light sticky-top flex-md-nowrap p-0 shadow">
                <Link className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" to="#">
                    <img src={logo} alt='Logo' height={40} width={40} /> <span className='logo-text'>Logo</span>
                </Link>
                
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <button type="button" className="btn btn-light">Sign out</button>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default NavBar;
