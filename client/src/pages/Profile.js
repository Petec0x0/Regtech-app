import React from 'react';
import { useParams } from 'react-router-dom';
import 'styles/profile.css';

const Profile = () => {
    const {customersId} = useParams();
    console.log(customersId);
    return (
        <div className="container main-secction">
            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 image-section">
                    <img src={require('images/profilebg.jpg')} alt="Profile background" />
                </div>
                <div className="row user-left-part">
                    <div className="col-md-3 col-sm-3 col-xs-12 user-profil-part pull-left">
                        <div className="row ">
                            <div className="col-md-12 col-md-12-sm-12 col-xs-12 user-image text-center">
                                <img src="https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png" alt="Profile Pic" className="rounded-circle" />
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12 user-detail-section1 text-center">
                                <button className="btn btn-success btn-block follow">Onboard</button>
                                <button className="btn btn-danger btn-block">Reject</button>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-9 col-sm-9 col-xs-12 pull-right profile-right-section">
                        <div className="row profile-right-section-row">
                            <div className="col-md-12 profile-header">
                                <div className="row">
                                    <div className="col-md-8 col-sm-6 col-xs-6 profile-header-section1 pull-left">
                                        <h1>Juan Perez</h1>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <ul className="nav nav-tabs" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" href="#profile" role="tab" data-toggle="tab"><i className="fas fa-user-circle"></i> Professional profile</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#buzz" role="tab" data-toggle="tab"><i className="fas fa-info-circle"></i> Detailed information</a>
                                            </li>
                                        </ul>

                                        <div className="tab-content">
                                            <div role="tabpanel" className="tab-pane fade show active" id="profile">
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <label>Name</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p>Juan Perez</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <label>Email</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p>juanp@gmail.com</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <label>Telephone</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p>12345678</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div role="tabpanel" className="tab-pane fade" id="buzz">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label>Experience</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p>Expert</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label>Availability</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p>6 months</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <label>Bio</label>
                                                        <br />
                                                        <p>Detail description</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default Profile;
