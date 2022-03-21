import React from 'react';
import { useParams } from 'react-router-dom';
import 'styles/profile.css';

const Profile = () => {
    const { customersId } = useParams();
    console.log(customersId);
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 image-section">
                    <img src={require('images/profile_bg.jpg')} alt="Profile background" />
                </div>
                <div className="row user-left-part">
                    <div className="col-md-3 col-sm-3 col-xs-12 user-profil-part pull-left">
                        <div className="row ">
                            <div className="col-md-12 col-md-12-sm-12 col-xs-12 user-image text-center">
                                <img src={require('images/avatar_profile.png')} alt="Profile Pic" className="rounded-circle" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="col-md-12 col-sm-12 col-xs-12 user-detail-section1 text-center">
                    <button className="btn btn-success btn-block follow">Onboard</button>
                    <button className="btn btn-danger btn-block">Reject</button>
                </div> */}
                <div className="col-md-12 col-sm-12 col-xs-12 container mt-4">
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <td><strong>Name</strong></td>
                                <td>Doe</td>
                            </tr>
                            <tr>
                                <td><strong>Date of birth</strong></td>
                                <td>03 Jan 2000</td>
                            </tr>
                            <tr>
                                <td><strong>Country of residence</strong></td>
                                <td>Peru</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div >

    )
}

export default Profile;
