import React from 'react';

const CustomerListTable = ({customers, navigate}) => {
    return (
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

export default CustomerListTable;
