import React from 'react'
import LeftBar from './LeftBar';
import Header from './Header';
import RightBar from './RightBar';

import ww1 from '../assets/img/ww1.png';
import points from '../assets/img/points.png';
import streamer from '../assets/img/streamer-img.png';
import share from '../assets/img/share.png';
import morewhite from '../assets/img/more-white.png';
import reward1 from '../assets/img/reward1.png';
import reward2 from '../assets/img/reward2.png';
import reward3 from '../assets/img/reward3.png';


function Home() {
  return (
    <>
      <Header></Header>
     <LeftBar></LeftBar>
     <RightBar></RightBar>
     <div className="stream-content">
        <div className="top-cnt-wrap d-flex">
            <div className="watch-win">
                <h2>WATCH, PREDICT & WIN</h2>
                <div className="ww-area">
                    <div className="ww-head d-flex align-items-center justify-content-between">
                        <h3>WWCD OF THIS MATCH?</h3>
                        <div className="timer-right">
                            <p>Pick up ends in</p>
                        </div>
                    </div>
                    <div className="card-wrap d-flex ">
                        <div className="card-area d-flex align-items-center justify-content-center active">
                            <img src={ww1} alt="" />
                        </div>
                        <div className="card-area d-flex align-items-center justify-content-center">
                            <img src={ww1} alt="" />
                        </div>
                        <div className="card-area d-flex align-items-center justify-content-center">
                            <img src={ww1} alt="" />
                        </div>
                        <div className="card-area d-flex align-items-center justify-content-center">
                            <img src={ww1} alt="" />
                        </div>
                        <div className="card-area d-flex align-items-center justify-content-center">
                            <img src={ww1} alt="" />
                        </div>
                        <div className="card-area d-flex align-items-center justify-content-center">
                            <img src={ww1} alt="" />
                        </div>
                        <div className="card-area d-flex align-items-center justify-content-center">
                            <img src={ww1} alt="" />
                        </div>
                        <div className="card-area d-flex align-items-center justify-content-center">
                            <img src={ww1} alt="" />
                        </div>
                        <div className="card-area d-flex align-items-center justify-content-center">
                            <img src={ww1} alt="" />
                        </div>
                        <div className="card-area d-flex align-items-center justify-content-center">
                            <img src={ww1} alt="" />
                        </div>
                    </div>
                    <div className="lgn-points d-flex align-items-center justify-content-between">
                        <div className="left-wrap">
                            <p>*Pick a team to participate in the competition and win
                                LGN Points (LP) <img src={points} alt="" /> </p>
                        </div>
                        <div className="right-wrap">
                            <h3>Rewards: <img src={points} alt="" />50 LP</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rewards">
                <h2>REWARDS</h2>
                <div className="card-wrap d-flex justify-content-center">
                    <div className="r-card">
                        <img src={reward1} alt="" />
                        <h3>HyperX Cloud II</h3>
                        <div className="r-para d-flex align-items-center justify-content-center">
                            <p>Available for 5000 LP</p>
                            <img src={points} alt="" />
                        </div>
                    </div>
                    <div className="r-card">
                        <img src={reward2} alt="" />
                        <h3>HyperX Cloud II</h3>
                        <div className="r-para d-flex align-items-center justify-content-center">
                            <p>Available for 5000 LP</p>
                            <img src={points} alt="" />
                        </div>
                    </div>
                    <div className="r-card">
                        <img src={reward3} alt="" />
                        <h3>HyperX Cloud II</h3>
                        <div className="r-para d-flex align-items-center justify-content-center">
                            <p>Available for 5000 LP</p>
                            <img src={points} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="stream-area">
            <iframe width="965" height="900" src="https://www.youtube.com/embed/OSQ0jdfeYEU?si=q7xm2AZiFfe4BKz1">
            </iframe>
        </div>
        <div className="bottom-area d-flex justify-content-between align-items-start">
            <div className="left-wrap">
                <div className="streamer-detail d-flex align-items-center">
                    <img src={streamer} alt="" />
                    <div className="detail">
                        <h2>Streamer Name</h2>
                        <p>300 Followers</p>
                    </div>
                </div>
                <div className="stream-title">
                    <h2>Stream Title</h2>
                    <p>Playing PUBG: Battlegrounds</p>
                    <div className="hashtag d-flex">
                        <h3>#Hashtags</h3>
                        <h3>#Hashtags</h3>
                    </div>
                </div>
            </div>
            <div className="right-wrap d-flex align-items-center">
                <p><span>300</span> Viewers</p>
                <h2>05:32:00</h2>
                <a href="#">
                  <img src={share} alt="" />
                  </a>
                <a href="#">
                  <img src={morewhite} alt="" />
                  </a>
            </div>
        </div>

    </div>
     </>
   
  )
}

export default Home