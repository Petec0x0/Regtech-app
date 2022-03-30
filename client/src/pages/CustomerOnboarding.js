import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import 'styles/customer-onboarding.css';
// VideoJs plugin
import videojs from 'video.js';
// eslint-disable-next-line
import RecordRTC from 'recordrtc';
// eslint-disable-next-line
import Record from 'videojs-record/dist/videojs.record.js';
import 'video.js/dist/video-js.min.css';
// The extra stylesheet for the plugin that includes 
// a custom font with additional icons
import 'videojs-record/dist/css/videojs.record.css';
import AlertMessage from 'components/AlertMessage';
import RecordVideoFieldset from 'components/RecordVideoFieldset';
import DocumentUploadFieldset from 'components/DocumentUploadFieldset';
import PersonalInfoFieldset from 'components/PersonalInfoFieldset';
import { dataFromImage } from 'utils/dataFromImage';
import * as faceapi from 'face-api.js';


const CustomerOnboarding = () => {
    // get customerLink Id from the url
    const { customerLink } = useParams();
    // reference to the video element
    const videoRef = useRef();
    const imageCanvasRef = useRef();
    const docImageRef = useRef();
    const isFirstRender = useRef(true);
    /**
     * create variable for face detection 
     * from both the uploaded document and recorded video
     */
    let vidFaceDetection = useRef();
    let docFaceDetection = useRef();

    //State for storing recorded video
    const [videoFile, setVideoFile] = useState(null);
    // creating states for organizing diffrent 
    // steps of the customer-oboarding form
    const [currentStep, setCurrentStep] = useState([1, 0, 0]);
    const [activeForms, setActiveForm] = useState([1]);
    // states for storing form data
    const [formInputData, setFormInputData] = useState({
        name: '', dateOfBirth: '', passportNo: '', nationality: '',
        countryOfResidence: '', phoneNo: '', address: '', occupation: ''
    });
    const [selectedDocument, setSelectedDocument] = useState(null);
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErroMsg] = useState("");
    const [onboardingSuccess, setOnboardingSuccess] = useState(false);
    const [videoSource, setVideoSource] = useState(require('images/placeholder.webm'));
    const [isDocProcessing, setIsDocProcessing] = useState(false);
    const [docProcessingMsg, setDocProcessingMsg] = useState('');
    const [isVidProcessing, setIsVidProcessing] = useState(false);
    const [vidProcessingMsg, setVidProcessingMsg] = useState({});
    const [faceComparePercentage, setFaceComparePercentage] = useState(0);
    const [thumbnailFile, setThumbnailFile] = useState(null);

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
                audio: false,
                video: true,
                maxLength: 5,
                displayMilliseconds: true,
                debug: true
            }
        }
    };

    const extractFace = async (image, x, y, width, height) => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        // Get a screenshot from the video
        context?.drawImage(image, x, y, width, height, 0, 0, width, height);
        canvas.toBlob((blob) => {
            image.src = URL.createObjectURL(blob);
        }, "image/jpeg");
    };

    useEffect(() => {
        // Initialize the video plugin when the page is fully loaded
        let player = videojs('myVideo', options, function () {
            // print version information at startup
            const msg = 'Using video.js ' + videojs.VERSION +
                ' with videojs-record ' + videojs.getPluginVersion('record');
            videojs.log(msg);

            console.log("videojs-record is ready!");
        });

        player.on('finishRecord', async () => {
            setIsVidProcessing(true);
            setVidProcessingMsg({message: 'Processing...', category: 'primary'});
            // recordedData is a blob object containing the recorded data that
            // can be downloaded by the user, stored on server etc.
            console.log('finished recording: ', player.recordedData);
            setVideoFile(player.recordedData);
            // convert recorded video to image
            // videoRef.current.src = await URL.createObjectURL(player.recordedData);
            // videoRef.current?.load();
            // show save as dialog
            const videoToImageVid = document.createElement('video');
            videoToImageVid.src = URL.createObjectURL(player.recordedData);
            videoToImageVid.autoplay = true;
            /**
             * using setInterval for actively listening to when the 
             * readyState of the video changes by checking every one-second until it loads in.
             */
            var b = setInterval(async ()=>{
                console.log(videoToImageVid.readyState >= 3);
                if(videoToImageVid.readyState >= 3){
                    //This block of code is triggered when the video is loaded
                    const canvas = document.createElement("canvas");
                    // scale the canvas accordingly
                    canvas.width = await videoRef.current.videoWidth;
                    canvas.height = await videoRef.current.videoHeight;
                    // draw the video at that frame

                    await canvas.getContext('2d')
                        .drawImage(videoToImageVid, 0, 0, canvas.width, canvas.height);

                    // convert it to a usable data URL
                    imageCanvasRef.current.src = await canvas.toDataURL();
                    canvas.toBlob((blob) => {
                        setThumbnailFile(blob);
                    }, "image/jpeg");
                    
        
                    //stop checking every half second
                    clearInterval(b);
                    setVideoSource(URL.createObjectURL(player.recordedData));
                }                   
            },1000);

            
            //player.record().saveAs({'video': 'my-video-file-name.webm'});
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        // Prevent the function from executing on the first render
        if (isFirstRender.current) {
            isFirstRender.current = false; // toggle flag after first render/mounting
            return;
        }
        async function doFaceDetection() {
            await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
            await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
            await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
            await faceapi.nets.faceExpressionNet.loadFromUri('/models');


            console.log(imageCanvasRef.current);
            vidFaceDetection.current = await faceapi.detectSingleFace(imageCanvasRef.current, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks().withFaceDescriptor();

            // If no face is detected, end the process and return a message
            if(!vidFaceDetection.current){
                setIsVidProcessing(false);
                setVidProcessingMsg({message: 'Face detection failed, try again', category: 'danger'});
                return;
            }

            console.log(vidFaceDetection.current);
            const { x, y, width, height } = vidFaceDetection.current.detection.box;
            extractFace(imageCanvasRef.current, x, y, width, height);

            if (docFaceDetection.current && vidFaceDetection.current) {
                setVidProcessingMsg({message: 'Face detected, comparing faces...', category: 'primary'});
                // Using Euclidean distance to comapare face descriptions
                const distance = faceapi.euclideanDistance(docFaceDetection.current.descriptor, vidFaceDetection.current.descriptor);
                setIsVidProcessing(false);
                setVidProcessingMsg({message: `Validation: ${Math.round(100-(distance*10))}%`, category: 'success'});
                setFaceComparePercentage(Math.round(100-(distance*10)));
            }
        }

        doFaceDetection();
    }, [videoSource])

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

    const handleFormInput = (e) => {
        setFormInputData({
            ...formInputData,
            [e.target.name]: e.target.value
        })
    }

    const handleSelectDocument = async (e) => {
        setIsDocProcessing(true);
        setDocProcessingMsg('Extracting data from document, \n please wait.');
        // handle validations
        let file = e.target.files[0];
        setSelectedDocument(file);
        setSubmitted(false);
        /**
         * Update the form form fields based 
         * on data extracted from the uploaded document
         *  */
        const dataExtracts = await dataFromImage(file);
        if (dataExtracts) {
            setDocProcessingMsg('Data extracted!');
            console.log(dataExtracts);
            console.log('DONE!');
        }

        setFormInputData({
            ...formInputData,
            ...dataExtracts
        })
        // Get face from the uploaded document
        setDocProcessingMsg('Getting face from the uploaded document!');
        // load Models
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        await faceapi.nets.faceExpressionNet.loadFromUri('/models');
        /**
         * convert selected document to object url and assign 
         * it to the image placeholder designated for it
         */
        docImageRef.current.src = URL.createObjectURL(file);
        /**
         * using face-api-js to find face description form 
         * the uploaded document
         */
        docFaceDetection.current = await faceapi.detectSingleFace(docImageRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks().withFaceDescriptor();
        console.log(docFaceDetection.current);
        const { x, y, width, height } = docFaceDetection.current.detection.box;
        extractFace(docImageRef.current, x, y, width, height);

        setDocProcessingMsg('Face extracted! Move to the next step');
        setIsDocProcessing(false);

    }

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // make sure none of the inputs is empty
        const isAnyFromEmpty = Object.values(formInputData).every(x => x === null || x === '');
        if (isAnyFromEmpty) {
            setErroMsg("Please fill all the required fields");
            setError(true);
        } else {
            /**
             * make sure a document was uploaded and
             * a video was recorded
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
                // append captured image to the form data
                formData.append('thumbnail', thumbnailFile);
                // append customerLink to the form data
                formData.append('linkId', customerLink);
                // apend validation percentage
                formData.append('validaition', faceComparePercentage);
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
                        isDocProcessing={isDocProcessing}
                        docProcessingMsg={docProcessingMsg}
                        handleSelectDocument={handleSelectDocument}
                        handleNext={handleNext}
                        currentStep={currentStep}
                    />

                    <RecordVideoFieldset
                        isVidProcessing={isVidProcessing}
                        vidProcessingMsg={vidProcessingMsg}
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

                    <img style={{ visibility: 'hidden' }} id="documentToImagePlaceholder" ref={docImageRef} src={require('images/placeholder.png')} alt="Document Placeholder" />
                    <img style={{ visibility: 'hidden' }} id="videoToImagePlaceholder" ref={imageCanvasRef} src={require('images/placeholder.png')} alt="Canvas" />
                    <video style={{ visibility: 'hidden' }} ref={videoRef} key={videoSource} width="320" height="240" controls>
                        <source src={videoSource} type="video/mp4" />
                    </video>

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
