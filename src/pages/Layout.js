import React from 'react'
import { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import logo from '../images/logo.png';

const Layout = () => {
    useEffect(() => {
        document.body.style.backgroundColor = "#ccd9f8"
    }, [])


    return (
        <div className="container">
            <header>
                <img src={logo} alt='Logo' height={54} width={54} /> <span className='logo-text'>Logo</span>
            </header>

            <Outlet />
        </div>
    )
}

export default Layout
