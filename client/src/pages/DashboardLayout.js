import React from 'react';
import { Outlet } from 'react-router-dom';
import 'styles/dashboard.css';
import NavBar from 'components/NavBar';
import SideBar from 'components/SideBar';

const DashboardLayout = () => {
    return (
        <>
            <NavBar />
            <div className="container-fluid">
                <div className="row">
                    <SideBar />
                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                    
                        <Outlet />
                        
                    </main>
                </div>
            </div>
        </>
    )
}

export default DashboardLayout;
