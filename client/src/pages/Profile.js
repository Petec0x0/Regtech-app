import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileEarmarkText, Film } from 'react-bootstrap-icons';
import 'styles/profile.css';
import AcceptButton from 'components/AcceptButton';
import RejectButton from 'components/RejectButton';

const Profile = () => {
    // Get the customer linkId from the url
    const { customersId } = useParams();

    let navigate = useNavigate();
    const [isDataReady, setIsDataReady] = useState(false);
    const [customer, setCustomer] = useState({});
    const [currenTab, setCurrentTab] = useState({info: true, files: false});

    useEffect(() => {
        // send a post request to the server to fetch customers
        (async () => {
            const rawResponse = await fetch(`/api/customer/${customersId}`, {
                method: 'GET',
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
                // update customers
                setCustomer({ ...content.data })
                // stop the progress bar
                setIsDataReady(true);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const switchTab = () => {
        setCurrentTab({info: !currenTab.info, files: !currenTab.files})
    }

    const dateOfBirth = new Date(customer.dateOfBirth);
    return (
        <div className="container">
            {
                // if data is not ready diplay spinners else diplay the table
                !isDataReady ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary" style={{ width: '4rem', height: '4rem' }}></div>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12 image-section">
                            <img src={require('images/profile_bg.jpg')} alt="Profile background" />
                        </div>
                        <div className="row user-left-part">
                            <div className="col-md-3 col-sm-3 col-xs-12 user-profil-part pull-left">
                                <div className="row ">
                                    <div className="col-md-12 col-md-12-sm-12 col-xs-12 user-image text-center">
                                        <img src={`http://127.0.0.1:8080/${customer.thumbnailPath}`} alt="Profile Pic" className="rounded-circle" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 d-flex justify-content-end">
                            <AcceptButton linkId={customer.linkId} navigate={navigate} />
                            <RejectButton linkId={customer.linkId} navigate={navigate} />
                            
                        </div>
                        <div className="container mt-2">
                            {/* <!-- Nav tabs --> */}
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item">
                                    <a 
                                        onClick={switchTab}
                                        className={'nav-link'+ (currenTab.info ? ' active':'')} 
                                        href="#personal"
                                    >
                                        Personal Info
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a 
                                        onClick={switchTab} 
                                        className={'nav-link'+ (currenTab.files ? ' active':'')} 
                                        href="#files"
                                    >
                                        Docs/Files
                                    </a>
                                </li>
                            </ul>

                            {/* <!-- Tab panes --> */}
                            <div className="tab-content">
                                <div id="personal" className={'container tab-pane'+ (currenTab.info ? ' active':'')}><br />
                                    <table className="table table-striped">
                                        <tbody>
                                            <tr>
                                                <td><strong>Name</strong></td>
                                                <td>{customer.name}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Email Address</strong></td>
                                                <td className='text-primary'>{customer.email}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Phone No.</strong></td>
                                                <td className='text-primary'>{customer.phoneNo}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Passport No.</strong></td>
                                                <td>{customer.passportNo}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Date of birth</strong></td>
                                                <td>
                                                    {`${dateOfBirth.getUTCDate()}/${dateOfBirth.getUTCMonth()}/${dateOfBirth.getFullYear()}`}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><strong>Country of residence</strong></td>
                                                <td>{customer.countryOfResidence}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Address</strong></td>
                                                <td>{customer.address}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Nationality</strong></td>
                                                <td>{customer.nationality}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Occupation</strong></td>
                                                <td>{customer.occupation}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="files" className={'container tab-pane'+ (currenTab.files ? ' active':'')}><br />
                                    <div className="pb-4">
                                        <a href={`http://127.0.0.1:8080/${customer.documentPath}`} target="_blank"  rel="noopener noreferrer">
                                            <FileEarmarkText /> <strong>Uploaded document</strong>
                                        </a>
                                    </div>
                                    <div>
                                        <a href={`http://127.0.0.1:8080/${customer.videoPath}`} target="_blank" rel="noopener noreferrer">
                                            <Film /> <strong>Recorded Video</strong>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </div >

    )
}

export default Profile;
