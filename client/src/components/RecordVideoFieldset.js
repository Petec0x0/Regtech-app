import React from 'react';

const RecordVideoFieldset = ({ isVidProcessing, vidProcessingMsg, handlePrevious, handleNext, currentStep }) => {
    return (
        <>
            <fieldset style={{ display: (currentStep[1]) ? '' : 'none' }}>
                <h2 className="fs-title">Record Video</h2>
                <h3 className="fs-subtitle">Record a 5 second video of your face</h3>
                <video id="myVideo" playsInline className="video-js vjs-default-skin"></video>
                
                <div>
                    {
                        // show the spinner if the document is being processed
                        (isVidProcessing) ? (
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : ''
                    }
                    {
                        // show processing message if it is not empty
                        (vidProcessingMsg) ? (
                            <div className={`alert alert-${vidProcessingMsg.category}`} role="alert">
                                {vidProcessingMsg.message}
                            </div>
                        ) : ''
                    }
                </div>

                <input
                    onClick={handlePrevious}
                    type="button" name="previous"
                    className="previous action-button-previous" value="Previous"
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

export default RecordVideoFieldset;
