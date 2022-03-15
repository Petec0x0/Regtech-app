import React from 'react';
import { PersonLinesFill, Pip } from 'react-bootstrap-icons';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
    const { pathname } = useLocation();

    return (
        <>
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="sidebar-sticky pt-4">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link  className={"nav-link" + (pathname.includes('customer-list') ? " active": "")} to="customer-list">
                                <PersonLinesFill className="feather" />
                                Customers list
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={"nav-link" + (pathname.includes('onboard-customer') ? " active": "")} to="onboard-customer">
                                <Pip className="feather" />
                                Onboard Customer
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default SideBar;
