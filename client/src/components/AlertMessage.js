import React from 'react'

const AlertMessage = ({ category, message }) => {
    return (
        <div className={`alert alert-${category} alert-dismissible text-center`}>
            <button type="button" className="close" data-dismiss="alert">&times;</button>
            {message}
        </div>
    )
}

export default AlertMessage
