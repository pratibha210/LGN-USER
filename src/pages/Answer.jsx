import React, { useCallback, useEffect, useState } from 'react';

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
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { httpRequest } from '../services/Helper';


const Answer = () => {
    const {getLocalStorageData } = useAppContext();
    const [userId, setUserId] = useState("");
    const [userDetails, setUserDetails] = useState({});
    const [prediction, setPrediction] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const {index} = useParams();

    const getPrediction = useCallback(async (page, id) => {
        try {
          const res = await httpRequest("GET", `api/tournament/prediction-list/${id}?page=${page}`);
          console.log(res,"predictions");
          setPrediction(prevPredictions => [...prevPredictions, ...res.result]);
          setTotalPages(res.totalPages);
        } catch (err) {
          console.error(err);
        }
      }, []);
    const getUserDetails = async () => {
        try {
          const data = await getLocalStorageData("user");
          console.log(data);
          
          if (data?._id && data?.token) {
            setUserId(data._id);
            const header2 = {
              Authorization: `Bearer ${data.token}`,
            };
    
            const res = await httpRequest("GET", `api/profile/user-profile/${data._id}`, {}, {}, header2);
            console.log(res);
            
            setUserDetails(res?.userdetails);
            getPrediction(1, data._id);
          }
        } catch (error) {
          console.error(error);
        }
      };
      useEffect(() => {
        getUserDetails();
      }, []);

      console.log(prediction[index], "answers");
      
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
                {
                    prediction[index]?.predictions?.map((question) => (
                        <div className="qstn-ans">
                    <div className="left-wrap">
                        <h3>Q4: <span className="qstn">{question?.question?.question}</span></h3>
                        <h3>Ans: <span className="correct-ans">{question?.answer}</span></h3>
                    </div>
                    <div className="right-wrap d-flex align-items-center">
                        <p>{question?.points}+</p>
                        <img src={points} alt=""/>
                    </div>
                </div>
                    ))
                }
                
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