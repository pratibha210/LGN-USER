import React, { useEffect, useState } from "react"

import LeftBar from "../Compoonents/LeftBar"
import Header from "../Compoonents/Header"
import RightBar from "../Compoonents/RightBar"

import points from "../assets/img/points.png"
import streamer from "../assets/img/streamer-img.png"
import share from "../assets/img/share.png"
import morewhite from "../assets/img/more-white.png"
import reward1 from "../assets/img/reward1.png"
import reward2 from "../assets/img/reward2.png"
import reward3 from "../assets/img/reward3.png"
import { httpRequest } from "../services/Helper"
import { useAppContext } from "../context/AppContext"
import Pusher from "pusher-js"
import { useSearchParams } from 'react-router-dom';
const Home = () => {
  const { error_notify, getLocalStorageData } = useAppContext()
  const [user, setUser] = useState({})
  const [questionList, setQuestionList] = useState([])
  const [timeLeft, setTimeLeft] = useState(null);
  const userData = getLocalStorageData("user")
    .then(data => {
      setUser(data)
    })
    .catch(err => {
      console.log(err)
    })


    const [searchParams] = useSearchParams();
    const id = searchParams.get('id'); 


    // console.log(id,"id");
    

  const getQuestionFunc = async () => {
    try {
      const data = await httpRequest(
        "GET",
        `api/v1/questions/${id}`,
        {},
        {},
        {
          "x-access-token": user?.token,
          "Content-Type": "application/json"
        }
      )
      setQuestionList(data?.questions)
    } catch (error) {
      error_notify("No questions found")
    } finally {
    }
  }

  useEffect(() => {
    getQuestionFunc()
  }, [user?.token])

  useEffect(() => {
    console.log("added to pusher")
    // Initialize Pusher
    const pusher = new Pusher(import.meta.env.VITE_APP_KEY, {
      cluster: import.meta.env.VITE_APP_CLUSTER
    })

    // Subscribe to channel
    const channel = pusher.subscribe(
      `tournament-question-${id}`
    )

    // Bind to event
    channel.bind(
      `tournament-question-notification-${id}`,
      data => {
        console.log("Received data:", data)
        //   setQuestionList(data);
      }
    )

    // Cleanup on unmount
    return () => {
      channel.unbind(
        `tournament-question-notification-${id}`
      )
      pusher.unsubscribe(`tournament-question-${id}`)
    }
  }, [])

  const giveAnswerFunc = async (questionId, optionKey) => {
    if(new Date (questionList[0]?.validUntil) > new Date (questionList[0]?.createdAt) ){
    const data = {
      optionNumber: optionKey._id,
      userId: user?._id
    }
    try {
      const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}` // Ensure to pass the token for authentication
      }
      await httpRequest(
        "PUT",
        `api/tournament/give-answer/${questionId}`,
        data,
        {},
        header
      )
      const updatedQuestions = questionList?.map(question => {
        if (question._id === questionId) {
          const updatedOptions = question.options.map(option => {
            if (option._id === optionKey._id) {
              return {
                ...option,
                users: [...option.users, user?._id]
              }
            }
            return option
          })

          return {
            ...question,
            options: updatedOptions
          }
        }
        return question
      })
      setQuestionList(updatedQuestions)
    } catch (err) {
      console.error("Error submitting answer:", err)
    }
  }else{
    error_notify("This quiz has been expired")
  }
  }


  useEffect(() => {
    // Calculate the time difference in milliseconds

    const timeDiff = questionList?.length > 0 && new Date (questionList[0]?.validUntil) - new Date (questionList[0]?.createdAt) ; // Milliseconds between dates

    if (timeDiff <= 0) {
      setTimeLeft(0); // Already expired
    } else {
      setTimeLeft(timeDiff); // Set the initial time
    }

    // Update the timer every second
    const timerInterval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1000) {
          clearInterval(timerInterval); // Stop the timer if time is up
          return 0;
        }
        return prevTime - 1000; // Subtract 1 second (1000 ms)
      });
    }, 1000);

    return () => clearInterval(timerInterval); // Cleanup on unmount
  }, [questionList ]);

  // Format the time left into hours, minutes, and seconds
  const formatTimeLeft = (milliseconds) => {
    if (milliseconds <= 0) {
      return "Expired";
    }
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <>
      <Header></Header>
      <LeftBar></LeftBar>
      <RightBar></RightBar>
      <div className="stream-content">
        <div className="top-cnt-wrap d-flex">
          <div className="watch-win">
            <h2>WATCH, PREDICT & WIN</h2>
            {questionList?.length > 0 &&
              questionList?.map((data, index) => {
                return (
                  <div className="ww-area" id="index">
                    <div className="ww-head d-flex align-items-center justify-content-between">
                      <h3>{data?.question}</h3>
                      <div className="timer-right">
                        <p>Pick up ends in</p>
                        /<p> {timeLeft !== null ? formatTimeLeft(timeLeft) : 'Loading...'}</p>
                      </div>
                    </div>
                    <div className="card-wrap d-flex ">
                      {data?.options?.length > 0 &&
                        data?.options?.map(x => {
                          return (
                            <div
                              onClick={() => giveAnswerFunc(data?._id, x)}
                              className="card-area d-flex align-items-center justify-content-center"
                            >
                              <img src={x?.image} alt="" />
                              <h3 className={[x?.users?.includes(user?._id) && "active"]}>{x?.text}</h3>
                            </div>
                          )
                        })}
                    </div>
                    <div className="lgn-points d-flex align-items-center justify-content-between">
                      <div className="left-wrap">
                        <p>
                          *Pick a team to participate in the competition and win
                          LGN Points (LP) <img src={points} alt="" />{" "}
                        </p>
                      </div>
                      <div className="right-wrap">
                        <h3>
                          Rewards: <img src={points} alt="" />
                          50 LP
                        </h3>
                      </div>
                    </div>
                  </div>
                )
              })}
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
          <iframe
            width="965"
            height="900"
            src="https://www.youtube.com/embed/OSQ0jdfeYEU?si=q7xm2AZiFfe4BKz1"
          ></iframe>
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
            <p>
              <span>300</span> Viewers
            </p>
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
