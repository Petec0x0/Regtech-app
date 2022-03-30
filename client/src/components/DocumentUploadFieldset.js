import React from 'react';

const DocumentUploadFieldset = ({ isDocProcessing, docProcessingMsg1, docProcessingMsg2, handleSelectDocument, handleNext, currentStep }) => {
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

                <div>
                    {
                        // show the spinner if the document is being processed
                        (isDocProcessing) ? (
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : ''
                    }
                    {
                        // show processing message if it is not empty
                        (docProcessingMsg1) ? (
                            <div className={`alert alert-${docProcessingMsg1.category}`}  role="alert">
                                {docProcessingMsg1.message}
                            </div>
                        ) : ''
                    }
                    {
                        // show processing message if it is not empty
                        (docProcessingMsg2) ? (
                            <div className={`alert alert-${docProcessingMsg2.category}`}  role="alert">
                                {docProcessingMsg2.message}
                            </div>
                        ) : ''
                    }
                </div>

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
