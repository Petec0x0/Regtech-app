import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'styles/customer-onboarding.css';
// VideoJs plugin
import videojs from 'video.js';
import RecordRTC from 'recordrtc';
import Record from 'videojs-record/dist/videojs.record.js';
import 'video.js/dist/video-js.min.css';
// The extra stylesheet for the plugin that includes 
// a custom font with additional icons
import 'videojs-record/dist/css/videojs.record.css';
import AlertMessage from 'components/AlertMessage';
import RecordVideoFieldset from 'components/RecordVideoFieldset';
import DocumentUploadFieldset from 'components/DocumentUploadFieldset';
import PersonalInfoFieldset from 'components/PersonalInfoFieldset';

const CustomerOnboarding = () => {
    // get customerLink Id from the url
    const { customerLink } = useParams();

    let options = {
        // video.js options
        controls: true,
        bigPlayButton: false,
        loop: false,
        fluid: true,
        width: 380,
        height: 240,
        plugins: {
            // videojs-record plugin options
            record: {
                audio: true,
                video: true,
                maxLength: 5,
                displayMilliseconds: true,
                debug: true
            }
        }
    };

    //State for storing recorded video
    const [videoFile, setVideoFile] = useState(null);
    useEffect(() => {
        // Initialize the video plugin when the page is fully loaded
        let player = videojs('myVideo', options, function () {
            // print version information at startup
            const msg = 'Using video.js ' + videojs.VERSION +
                ' with videojs-record ' + videojs.getPluginVersion('record');
            videojs.log(msg);

            console.log("videojs-record is ready!");
        });

        player.on('finishRecord', () => {
            // recordedData is a blob object containing the recorded data that
            // can be downloaded by the user, stored on server etc.
            console.log('finished recording: ', player.recordedData);
            setVideoFile(player.recordedData)
            // show save as dialog
            //player.record().saveAs({'video': 'my-video-file-name.webm'});
        });
    })

    // creating states for organizing diffrent 
    // steps of the customer-oboarding form
    const [currentStep, setCurrentStep] = useState([1, 0, 0]);
    const [activeForms, setActiveForm] = useState([1]);

    // A function for rearranging array elements used 
    // for keeping track of the current form (forget about how it works)
    const array_move = (arr, old_index, new_index) => {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing
    };

    // Handle 'Next' button click for any of the forms
    const handleNext = () => {
        let index = currentStep.indexOf(1);
        const newStep = array_move(currentStep, index, ++index);
        setCurrentStep([...newStep]);
        activeForms.push(1);
        setActiveForm([...activeForms]);
    }
    // Handle 'Previous' button click for any of the forms
    const handlePrevious = () => {
        let index = currentStep.indexOf(1);
        const newStep = array_move(currentStep, index, --index);
        setCurrentStep([...newStep]);
        activeForms.pop();
        setActiveForm([...activeForms]);
    }

    // states for storing for data
    const [formInputData, setFormInputData] = useState({});
    const [selectedDocument, setSelectedDocument] = useState(null);
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErroMsg] = useState("");
    const [onboardingSuccess, setOnboardingSuccess] = useState(false);

    const handleFormInput = (e) => {
        setFormInputData({
            ...formInputData,
            [e.target.name]: e.target.value
        })
    }

    const handleSelectDocument = (e) => {
        // handle validations
        let file = e.target.files[0];
        setSelectedDocument(file);
        setSubmitted(false);
    }

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // make sure none of the inputs is empty
        const isAvailable = (('dateOfBirth' in formInputData) && ('passportNo' in formInputData) &&
            ('nationality' in formInputData) && ('countryOfResidence' in formInputData) &&
            ('phoneNo' in formInputData) && ('address' in formInputData) && ('occupation' in formInputData))
        const isAnyFromEmpty = Object.values(formInputData).every(x => x === null || x === '');
        if (isAnyFromEmpty || !isAvailable) {
            setErroMsg("Please fill all the required fields");
            setError(true);
        } else {
            /**
             * make sure a document was uploaded a video was recorded
             */
            // 
            if ((Object.keys(videoFile).length === 0)) {
                setErroMsg("Please record a 5 seconds video in step 2");
                setError(true);
            } else if (!(selectedDocument)) {
                setErroMsg("Please select a document in Step 1");
                setError(true);
            } else {
                setError(false);
                setSubmitted(true);
                const formData = new FormData();
                // append the customer selected document to the form data
                formData.append('document', selectedDocument);
                // append the recorded video to the form data
                formData.append('video', videoFile, videoFile.name);
                // append customerLink to the form data
                formData.append('linkId', customerLink);
                // append the rest of the form input data
                Object.keys(formInputData).map((key, index) => {
                    return formData.append(key, formInputData[key]);
                });

                // send form data as post request to the server
                (async () => {
                    const rawResponse = await fetch('/api/onboarding/upload', {
                        method: 'POST',
                        body: formData
                    });
                    const content = await rawResponse.json();
                    // stop the progress bar
                    setSubmitted(false);
                    // check if there is an error in the response
                    if (content.error) {
                        setErroMsg(content.message);
                        setError(true);
                    } else {
                        setOnboardingSuccess(true);
                    }
                })();
            }
        }
    }

    return (
        <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-md-offset-3">
                <form id="msform" encType="multipart/form-data" style={{ display: onboardingSuccess ? 'none' : '' }}>
                    {
                        // show the alert message if there is an error
                        (error) ? (
                            <div className="alert alert-danger">
                                {errorMsg}
                            </div>
                        ) : ""
                    }

                    {
                        // show the progress bar if data is submited and being processed
                        (submitted) ? (
                            <div className="progress mb-4">
                                <div className="progress-bar progress-bar-striped progress-bar-animated"
                                    role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                                    style={{ width: "100%" }}>
                                </div>
                            </div>
                        ) : ""
                    }

                    {/* <!-- progressbar for the form stages --> */}
                    <ul id="progressbar">
                        <li className={activeForms[0] ? "active" : ""}>Document Upload</li>
                        <li className={activeForms[1] ? "active" : ""}>Record Video</li>
                        <li className={activeForms[2] ? "active" : ""}>Personal Info</li>
                    </ul>
                    {/* <!-- fieldsets --> */}

                    <DocumentUploadFieldset 
                        handleSelectDocument={handleSelectDocument}
                        handleNext={handleNext} 
                        currentStep={currentStep}
                    />

                    <RecordVideoFieldset 
                        handlePrevious={handlePrevious} 
                        handleNext={handleNext}
                        currentStep={currentStep}
                    />

                    <PersonalInfoFieldset 
                        handleFormInput={handleFormInput}
                        formInputData={formInputData}
                        handleSubmit={handleSubmit}
                        handlePrevious={handlePrevious}
                        currentStep={currentStep}
                    />
                    
                </form>
                {
                    // show a success alert message if onboardingSuccess
                    (onboardingSuccess) ? (
                        <AlertMessage
                            message={`Thank you for onboarding yourself`}
                            category="success"
                        />
                    ) : ""
                }
            </div>
        </div>
    )
}

export default CustomerOnboarding;
