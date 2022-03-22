import React from 'react'

const AlertMessage = ({ category, message }) => {
    return (
        <div className={`alert alert-${category} alert-dismissible`}>
            <button type="button" className="close" data-dismiss="alert">&times;</button>
            {message}
        </div>
    )
}

export default AlertMessage
