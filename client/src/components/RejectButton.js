import React from 'react';

const RejectButton = ({linkId, navigate}) => {
    const handleReject = () => {
        // send a post request to the server to accept customer
        (async () => {
            const rawResponse = await fetch(`/api/customer/update-customer-status`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ linkId: linkId, status: 'rejected' })
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
                navigate("/dashboard/customers");
            }
        })();
    }

    return (
        <>
            <button 
                className="btn btn-danger"
                onClick={handleReject}
            >
                Reject
            </button>
        </>
    )
}

export default RejectButton;
