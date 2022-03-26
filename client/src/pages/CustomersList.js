import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'styles/customerlist.css';
import SpinLoader from 'components/SpinLoader';
import CustomerListTable from 'components/CustomerListTable';
import waitingIllustration from 'images/waiting-for-customer.svg';

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
                    <SpinLoader />
                ) : (
                    // If there is no customer yet, display a message
                    !(customers === undefined || customers.length === 0) ? (
                        <CustomerListTable customers={customers} navigate={navigate}  />
                    ) : (
                        <>
                            <h3 className="text-center text-secondary">Your customers will appear here</h3>
                            <div className="d-flex justify-content-center">
                                <img src={waitingIllustration}  alt="illustration" />
                            </div>
                        </>
                    )
                    
                )
            }
            {/* <div className="containers">
                <ul className="pagination justify-content-end">
                    <li className="page-item disabled"><Link className="page-link" to="#">Previous</Link></li>
                    <li className="page-item active"><Link className="page-link" to="#">1</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">Next</Link></li>
                </ul>
            </div> */}
        </>
    )
}

export default CustomersList;