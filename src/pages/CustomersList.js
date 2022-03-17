import React from 'react';
import { Link } from 'react-router-dom';
import 'styles/customerlist.css';

const CustomersList = () => {
    const customers = require('data/customers.json');
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Customers List</h1>
            </div>

            <div className="row">
                {
                    customers.map((customer, index) => {
                        return (
                            <Link to={`${customer.id}`} key={index} className="card col-sm-3" style={{textDecoration: "none", color: "inherit"}}>
                                <img 
                                    src={require(`images/${customer.thumbnail}`)} 
                                    className="img-fluid" alt={customer.name} 
                                    style={{width:"100%", maxHeight: '118px', objectFit: "cover"}} 
                                />
                                <h4>{customer.name}</h4>
                                <p className="text-primary">{customer.email}</p>
                                <p className={`badge badge-${customer.status} badge-outlined`}>{customer.status}</p>
                            </Link>
                        );
                    })
                }
            </div>
        </>
    )
}

export default CustomersList;
