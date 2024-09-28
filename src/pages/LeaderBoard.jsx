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


export default function LeaderBoard (){
    return  (
        <>
         <Header></Header>
         <LeftBar></LeftBar>
         <RightBarSmall></RightBarSmall>
         <div className="leaderboard">
        <div className="leaderboard-banner d-flex align-items-center justify-content-between">
            <div className="left-wrap d-flex align-items-center">
                <img src={g1} alt="" />
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
                <p>Rewards: <img src={points} alt="" /> 10-1000 LP</p>
                <a href="#">How to play?</a>
            </div>
        </div>
        <div className="leaderboard-menu">
            <ul className="bg-ff">
                <li><a href="#">About</a></li>
                <li><a href="#" className="active">Leaderboard</a></li>
                <li><a href="/answer">Your Answers</a></li>
            </ul>
        </div>
        <div className="leaderboard-position">
            <h2>YOUR POSITION</h2>
            <table>
                <tr>
                    <td>#77</td>
                    <td>Sumit Majumder</td>
                    <td>40</td>
                    <td>20</td>
                    <td>200</td>
                </tr>
            </table>
        </div>
        <div className="overall-leaderboard bg-ff">
            <h2>OVERALL LEADERBOARD</h2>
            <table>
                <tr>
                    <th>#</th>
                    <th>NAME</th>
                    <th></th>
                    <th></th>
                    <th>LGN Points</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Sumit Majumder</td>
                    <td>40</td>
                    <td>20</td>
                    <td>200</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Sumit Majumder</td>
                    <td>40</td>
                    <td>20</td>
                    <td>200</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Sumit Majumder</td>
                    <td>40</td>
                    <td>20</td>
                    <td>200</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Sumit Majumder</td>
                    <td>40</td>
                    <td>20</td>
                    <td>200</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Sumit Majumder</td>
                    <td>40</td>
                    <td>20</td>
                    <td>200</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Sumit Majumder</td>
                    <td>40</td>
                    <td>20</td>
                    <td>200</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Sumit Majumder</td>
                    <td>40</td>
                    <td>20</td>
                    <td>200</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Sumit Majumder</td>
                    <td>40</td>
                    <td>20</td>
                    <td>200</td>
                </tr>
            </table>
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

