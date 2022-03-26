import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'styles/customerlist.css';

const CustomersList = () => {
    let navigate = useNavigate();
    const [isDataReady, setIsDataReady] = useState(false);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // send a post request to the server to fetch customers
        (async () => {
            const rawResponse = await fetch('/api/customer', {
                method: 'GET',
            });
            const content = await rawResponse.json();
            const status = rawResponse.status;
            // Redirect the user to login page if status == 401
            if (status === 401) {
                // redirect to login page
                navigate("/login");
            }
            // check if there is an error in the response
            if (content.error) {
                alert(content.message);
            } else {
                // update customers
                setCustomers([...content.data])
                // stop the progress bar
                setIsDataReady(true);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Customers</h1>
            </div>
            {
                // if data is not ready diplay spinners else diplay the table
                !isDataReady ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary" style={{ width: '4rem', height: '4rem' }}></div>
                    </div>
                ) : (
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
                                            <tr key={index} onClick={() => { navigate(`/dashboard/customers/${customer.linkId}`) }}>
                                                <td>
                                                    <img
                                                        src={`http://127.0.0.1:8080/${customer.thumbnailPath}`}
                                                        className="rounded-circle" alt={customer.name}
                                                        style={{ width: "40px", height: '40px', objectFit: "cover" }}
                                                    />
                                                </td>
                                                <td className="align-middle">{customer.name}</td>
                                                <td className="align-middle text-primary">{customer.email}</td>
                                                <td className="align-middle">
                                                    <p className={`badge badge-${customer.status}`}><i>{customer.status}</i></p>
                                                </td>

                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
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