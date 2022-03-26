import React from 'react';

const DocumentUploadFieldset = ({ handleSelectDocument, handleNext, currentStep }) => {
    return (
        <>
            <fieldset style={{ display: (currentStep[0]) ? '' : 'none' }}>
                <h2 className="fs-title">Document Upload</h2>
                <h3 className="fs-subtitle">Upload an identity document(e.g Password)</h3>
                {/* Document selector input field */}
                <input
                    onChange={handleSelectDocument}
                    type="file"
                    className="form-control-file border"
                    name="document"
                />
                <input
                    onClick={handleNext}
                    type="button" name="next"
                    className="next action-button" value="Next"
                />
            </fieldset>
        </>
    )
}

export default DocumentUploadFieldset;
