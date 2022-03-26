import React from 'react';

const PersonalInfoFieldset = ({handleFormInput, formInputData, handleSubmit, handlePrevious, currentStep}) => {
    return (
        <>
            <fieldset style={{ display: (currentStep[2]) ? '' : 'none' }}>
                <h2 className="fs-title">Personal Information</h2>
                <h3 className="fs-subtitle">Fill in your credentials</h3>
                <input
                    onChange={handleFormInput} value={formInputData['dateOfBirth']}
                    onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'}
                    type="text" className="form-control" name="dateOfBirth"
                    placeholder="Enter Date of Birth"
                />
                <input
                    onChange={handleFormInput} value={formInputData['passportNo']}
                    type="text" name="passportNo" placeholder="Enter Passport number"
                />
                <input
                    onChange={handleFormInput} value={formInputData['nationality']}
                    type="text" name="nationality" placeholder="Nationality"
                />
                <input
                    onChange={handleFormInput} value={formInputData['countryOfResidence']}
                    type="text" name="countryOfResidence" placeholder="Country of residence"
                />
                <input
                    onChange={handleFormInput} value={formInputData['phoneNo']}
                    type="text" name="phoneNo" placeholder="Phone number"
                />
                <input
                    onChange={handleFormInput} value={formInputData['address']}
                    type="text" name="address" placeholder="Address"
                />
                <input
                    onChange={handleFormInput} value={formInputData['occupation']}
                    type="text" name="occupation" placeholder="Occupation"
                />
                <input 
                    onClick={handlePrevious} 
                    type="button" name="previous" className="previous action-button-previous" value="Previous" 
                />
                <input
                    onClick={handleSubmit}
                    type="submit" name="submit"
                    className="submit action-button" value="Submit"
                />
            </fieldset>
        </>
    )
}

export default PersonalInfoFieldset;
