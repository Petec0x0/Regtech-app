import React, { useState, useEffect } from 'react';
import 'styles/customer-onboarding.css';
// VideoJs plugin
import videojs from 'video.js';
import RecordRTC from 'recordrtc';
import Record from 'videojs-record/dist/videojs.record.js';
import 'video.js/dist/video-js.min.css';
// The extra stylesheet for the plugin that includes 
// a custom font with additional icons
import 'videojs-record/dist/css/videojs.record.css';




const CustomerOnboarding = () => {
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
            // show save as dialog
            //player.record().saveAs({'video': 'my-video-file-name.webm'});
        });
    })

    // creating states for organizing diffrent 
    // steps of the customer-oboarding form
    const [currentStep, setCurrentStep] = useState([1, 0, 0]);
    const [activeForms, setActiveForm] = useState([1]);

    // A function for rearranging array elements used 
    // for keeping track of the current form
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


    return (
        <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-md-offset-3">
                <form id="msform">
                    {/* <!-- progressbar --> */}
                    <ul id="progressbar">
                        <li className={activeForms[0] ? "active" : ""}>Document Upload</li>
                        <li className={activeForms[1] ? "active" : ""}>Record Video</li>
                        <li className={activeForms[2] ? "active" : ""}>Personal Info</li>
                    </ul>
                    {/* <!-- fieldsets --> */}


                    <fieldset style={{ display: (currentStep[0]) ? '' : 'none' }}>
                        <h2 className="fs-title">Document Upload</h2>
                        <h3 className="fs-subtitle">Upload an identity document(e.g Password)</h3>
                        <input type="file" className="form-control-file border" name="file" />
                        <input onClick={handleNext} type="button" name="next" className="next action-button" value="Next" />
                    </fieldset>

                    <fieldset style={{ display: (currentStep[1]) ? '' : 'none' }}>
                        <h2 className="fs-title">Record Video</h2>
                        <h3 className="fs-subtitle">Record a 5 second video of your face</h3>
                        <video id="myVideo" playsInline className="video-js vjs-default-skin"></video>
                        <input onClick={handlePrevious} type="button" name="previous" className="previous action-button-previous" value="Previous" />
                        <input onClick={handleNext} type="button" name="next" className="next action-button" value="Next" />
                    </fieldset>

                    <fieldset style={{ display: (currentStep[2]) ? '' : 'none' }}>
                        <h2 className="fs-title">Personal Information</h2>
                        <h3 className="fs-subtitle">Fill in your credentials</h3>
                        <input type="date" className="form-control" name="dob" />
                        <input type="text" name="passportNo" placeholder="Enter Passport number" />
                        <input type="text" name="nationality" placeholder="Nationality" />
                        <input type="text" name="countryOfResidence" placeholder="Country of residence" />
                        <input type="text" name="phoneNo" placeholder="Phone number" />
                        <input type="text" name="address" placeholder="Address" />
                        <input type="text" name="occupation" placeholder="Occupation" />
                        <input onClick={handlePrevious} type="button" name="previous" className="previous action-button-previous" value="Previous" />
                        <input type="submit" name="submit" className="submit action-button" value="Submit" />
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default CustomerOnboarding;
