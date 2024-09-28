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


const Answer = () => {
    return  (
        <>
         <Header></Header>
         <LeftBar></LeftBar>
         <RightBarSmall></RightBarSmall>
         <div className="leaderboard">
        <div className="leaderboard-banner d-flex align-items-center justify-content-between">
            <div className="left-wrap d-flex align-items-center">
                <img src={g1} alt=""/>
                <div className="banner-head">
                    <h2>SUPER GAMING LEAGUE</h2>
                    <div className="para-wrap d-flex">
                        <p>Tier: S</p>
                        <p>5 Games</p>
                        <p>Duration: 2 Months</p>
                    </div>
                </div>
            </div>
            <div className="right-wrap">
                <p>Rewards: <img src={points} alt=""/> 10-1000 LP</p>
                <a href="#">How to play?</a>
            </div>
        </div>

        <div className="leaderboard-menu">
            <ul className="bg-ff">
                <li><a href="#">About</a></li>
                <li><a href="#">Leaderboard</a></li>
                <li><a href="#" className="active">Your Answers</a></li>
            </ul>
        </div>

        <div className="leaderboard-history">
            <h2>History</h2>
            <div className="qstn-ans-wrap">
                <div className="qstn-ans">
                    <div className="left-wrap">
                        <h3>Q4: <span className="qstn">Underdog team?</span></h3>
                        <h3>Ans: <span className="correct-ans">Carnival Gaming</span></h3>
                    </div>
                    <div className="right-wrap d-flex align-items-center">
                        <p>10+</p>
                        <img src={points} alt=""/>
                    </div>
                </div>
                <div className="qstn-ans">
                    <div className="left-wrap">
                        <h3>Q4: <span className="qstn">Underdog team?</span></h3>
                        <h3>Ans: <span className="wrong-ans">Carnival Gaming</span></h3>
                    </div>
                    <div className="right-wrap d-flex align-items-center">
                        <p>0+</p>
                        <img src={points} alt=""/>
                    </div>
                </div>
                <div className="qstn-ans">
                    <div className="left-wrap">
                        <h3>Q4: <span className="qstn">Underdog team?</span></h3>
                        <h3>Ans: <span className="correct-ans">Carnival Gaming</span></h3>
                    </div>
                    <div className="right-wrap d-flex align-items-center">
                        <p>10+</p>
                        <img src={points} alt=""/>
                    </div>
                </div>
            </div>
        </div>

        <div className="pagination">
            <ul className="d-flex">
                <li><a href="#" className="active">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><button className="last-btn">Last</button></li>
            </ul>
        </div>
    </div>
        <Footer></Footer>
         </>
       
      )
};

export default Answer;