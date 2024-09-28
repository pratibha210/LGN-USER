import React from 'react';

import LeftBar from '../Compoonents/LeftBar';
import Header from '../Compoonents/Header';
import RightBarSmall from '../Compoonents/RightBarSmall';
import Footer from '../Compoonents/Footer';

import banner from '../assets/img/banner.png';
import userimg from '../assets/img/user-img.png';
import flag from '../assets/img/flag.png';
import pointbig from '../assets/img/point-big.png';
import points from '../assets/img/points.png';
import add from '../assets/img/add.png';
import g1 from '../assets/img/g1.png';


const Profile = () => {
    return  (
        <>
         <Header></Header>
         <LeftBar></LeftBar>
         <RightBarSmall></RightBarSmall>
         <div className="profile-area">
        <div className="banner-area">
            <img src={banner} alt="" />
            <div className="user-detail d-flex align-items-center justify-content-between">
                <div className="left-wrap">
                    <img src={userimg} alt="" />
                    <h2>Noobmaster_69</h2>
                </div>
                <div className="right-wrap d-flex">
                    <div className="detail-area">
                        <h2>Hours engaged:</h2>
                        <p>10 Hrs</p>
                    </div>
                    <div className="detail-area">
                        <h2>Coins Earned</h2>
                        <p>200</p>
                    </div>
                    <div className="detail-area">
                        <h2>Location</h2>
                        <p className="d-flex align-items-center">India <img src={flag} alt="" /></p>
                    </div>
                    <div className="detail-area">
                        <h2>Level</h2>
                        <p>30</p>
                    </div>
                    <div className="detail-area">
                        <a href="#" className="btn edit-btn">Edit Profile</a>
                    </div>
                </div>
            </div>
        </div>
        <div className="about-wrap">
            <div className="row">
                <div className="col-sm-6">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="about-me box-area">
                                <h2>About Me</h2>
                                <p>Lorem ipsum dolor sit amet consectetur. Eu urna faucibus quisque sed faucibus sit
                                    lectus. Sollicitudin fermentum enim volutpat lobortis. Nunc morbi tortor at nunc
                                    habitant iaculis feugiat. Tellus amet iaculis quis urna convallis.</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="rewards box-area">
                                <h2>Rewards</h2>
                                <div className="rewards-wrap d-flex justify-content-between align-items-center">
                                    <div className="left-wrap d-flex align-items-center">
                                        <img src={pointbig} alt="" />
                                        <div className="lgn-points">
                                            <h3>200</h3>
                                            <p>LGN Points</p>
                                        </div>
                                    </div>
                                    <div className="right-wrap">
                                        <a href="/store" className="btn main-btn" >Reedem</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="interested-games box-area">
                                <h2>Interested Games</h2>
                                <div className="game-wrap d-flex">
                                    <div className="games">VALORANT</div>
                                    <div className="games">BGMI</div>
                                    <div className="games">CS:GO</div>
                                    <div className="games">DOTA 2</div>
                                    <div className="games add d-flex align-items-center justify-content-center"><img
                                            src={add} alt="" /></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="predictions box-area">
                                <h2>Predictions</h2>
                                <div className="prediction-area d-flex align-items-center">
                                    <div className="progress-bar">
                                        {/* <progress value="75" min="0" max="100" style="visibility:hidden;height:0;width:0;">75%</progress> */}
                                    </div>
                                    <div className="predict-nos">
                                        <div className="total-nos b-35">60 Total Predictions</div>
                                        <div className="win-nos d-flex">
                                            <p className="total-nos b-0e">20 Wins</p>
                                            <p className="total-nos b-e8">40 Wins</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="history-wrap">
                        <h2>History</h2>
                        <div className="league-wrap d-flex">
                            <div className="league-area d-flex">
                                <img src={g1} alt="" />
                                <div className="league-detail">
                                    <h2>SUPER GAMING LEAGUE</h2>
                                    <div className="g-detail d-flex align-items-center justify-content-between w-100">
                                        <p>Tier: S</p>
                                        <h2 className="d-flex">LP Earned: <span className="d-flex"><img src={points}
                                                    alt="" />200 LP</span></h2>
                                    </div>
                                </div>
                            </div>
                            <div className="league-area d-flex">
                                <img src={g1} alt="" />
                                <div className="league-detail">
                                    <h2>SUPER GAMING LEAGUE</h2>
                                    <div className="g-detail d-flex align-items-center justify-content-between w-100">
                                        <p>Tier: S</p>
                                        <h2 className="d-flex">LP Earned: <span className="d-flex"><img src={points}
                                                    alt="" />200 LP</span></h2>
                                    </div>
                                </div>
                            </div>
                            <div className="league-area d-flex">
                                <img src={g1} alt="" />
                                <div className="league-detail">
                                    <h2>SUPER GAMING LEAGUE</h2>
                                    <div className="g-detail d-flex align-items-center justify-content-between w-100">
                                        <p>Tier: S</p>
                                        <h2 className="d-flex">LP Earned: <span className="d-flex"><img src={points}
                                                    alt="" />200 LP</span></h2>
                                    </div>
                                </div>
                            </div>
                            <a href="#">See all tourmaments</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <Footer></Footer>
         </>
       
      )
};

export default Profile;