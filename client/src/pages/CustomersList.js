import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'styles/customerlist.css';

const CustomersList = () => {
    let navigate = useNavigate();

    const customers = require('data/customers.json');
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Customers</h1>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="thead-light">
                        <tr>
                            <th>#</th>
                            <th>Custome Name</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customers.map((customer, index) => {
                                return (
                                    <tr key={index} onClick={() => { navigate(`/dashboard/customers/${customer.id}`) }}>
                                        <td>
                                            <img
                                                src={require(`images/${customer.thumbnail}`)}
                                                className="rounded-circle" alt={customer.name}
                                                style={{ width: "60px", height: '60px', objectFit: "cover" }}
                                            />
                                        </td>
                                        <td>{customer.name}</td>
                                        <td className="text-primary">{customer.email}</td>
                                        <td>
                                            <p className={`badge badge-${customer.status}`}>{customer.status}</p>
                                        </td>

                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div className="containers">
                <ul className="pagination justify-content-end">
                    <li className="page-item disabled"><Link className="page-link" to="#">Previous</Link></li>
                    <li className="page-item active"><Link className="page-link" to="#">1</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">Next</Link></li>
                </ul>
            </div>
        </>
    )
}

export default CustomersList;