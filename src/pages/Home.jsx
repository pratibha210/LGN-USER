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
import { useParams } from "react-router-dom"

const Home = () => {
  const {success_notify, error_notify, getLocalStorageData } = useAppContext();
  const [user, setUser] = useState({ token: "" })
  const [questionList, setQuestionList] = useState([])
  const [userData, setUserData] = useState({});
  const [tournamentData, setTournamentData] = useState({});
  const { id } = useParams();
  // console.log(location.pa);
  
  getLocalStorageData("user")
    .then(data => {
      setUser({ token: data?.token })
    })
    .catch(err => {
      console.log(err)
    })

  const tournamentDetails = async() => {
    getLocalStorageData('user').then((data) => {
      const header2 = {
        Authorization: "Bearer " + (data ? data.token : ''),
      };

        httpRequest("GET", `api/tournament/get-tournament-details/${id}`, {}, {}, header2)
        .then((res) => {
          console.log(res,"hfkjsdhkjf");
          setTournamentData(res.tournament);
          setUserData(res.userdetails);
        })
        .catch((error) => {
          console.log(error);
        });
    }).catch((err) => {
      console.log(err, "tournament details error");
    });
  };

  useEffect(() => {
    tournamentDetails();
  }, [id]);



  const getQuestionFunc = async () => {
    try {
      const data = await httpRequest(
        "GET",
        `api/v1/questions/${"66f13aa22d31ce4ceb33c669"}`,
        {},
        {},
        {
          "x-access-token": user?.token,
          "Content-Type": "application/json"
        }
      )
      console.log(data, "datadata")
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
      `tournament-question-${"66f13aa22d31ce4ceb33c669"}`
    )

    // Bind to event
    channel.bind(
      `tournament-question-notification-${"66f13aa22d31ce4ceb33c669"}`,
      data => {
        console.log("Received data:", data)
        //   setQuestionList(data);
      }
    )

    // Cleanup on unmount
    return () => {
      channel.unbind(
        `tournament-question-notification-${"66f13aa22d31ce4ceb33c669"}`
      )
      pusher.unsubscribe(`tournament-question-${"66f13aa22d31ce4ceb33c669"}`)
    }
  }, ["66f13aa22d31ce4ceb33c669"])

  const giveAnswer = async (questionId, optionKey, userId) => {
    const data = {
      optionNumber: optionKey._id,
      userId
    }
    try {
      const { token } = await getlocalStorage("user_details")
      const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // Ensure to pass the token for authentication
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
                users: [...option.users, userId]
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
      updateQuestion(updatedQuestions)
    } catch (err) {
      console.error("Error submitting answer:", err)
    }
  }

  return (
    <>
      <Header></Header>
      <LeftBar></LeftBar>
      <RightBar userDetails={userData}></RightBar>
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
                      </div>
                    </div>
                    <div className="card-wrap d-flex ">
                      {data?.options?.length > 0 &&
                        data?.options?.map(x => {
                          return (
                            <div
                              onClick={() => giveAnswerFunc(data, x)}
                              className="card-area d-flex align-items-center justify-content-center"
                            >
                              <img src={x?.image} alt="" />
                              <h3 className="active">{x?.text}</h3>
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
          <iframe width="965" height="900" src={tournamentData?.streaming_link}>
          </iframe>
        </div>
        <div className="bottom-area d-flex justify-content-between align-items-start">
          <div className="left-wrap">
            <div className="streamer-detail d-flex align-items-center">
              <img src={streamer} alt="" />
              <div className="detail">
                <h2>{userData?.name}</h2>
                <p>{userData?.followerCount} Followers</p>
              </div>
            </div>
            <div className="stream-title">
              <h2>Stream Title</h2>
              <p>{tournamentData?.title}</p>
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
