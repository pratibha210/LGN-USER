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
import { useSearchParams } from "react-router-dom"

const Home = () => {
  const {success_notify, error_notify, getLocalStorageData } = useAppContext();
  const [user, setUser] = useState({ token: "" })
  const [timeLeft, setTimeLeft ]= useState()
  const [questionList, setQuestionList] = useState([])
  // const [userData, setUserData] = useState({});
  const [tournamentData, setTournamentData] = useState({});
  const [searchParams] = useSearchParams();
  // const id = searchParams.get('id');
  const { id } = useParams();
  // console.log(location.pa);
  const userData = getLocalStorageData("user")
  getLocalStorageData("user")
    .then(data => {
      setUser(data)
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
    loadSelectedAnswers();
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
        setQuestionList([data]);
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

  const loadSelectedAnswers = async () => {
    try {

      const savedAnswers = await localStorage.getItem('selectedAnswers');
      if (savedAnswers) {
        setSelectedAnswer(JSON.parse(savedAnswers));
      }
    } catch (err) {
      console.error('Error loading selected answers:', err.message || err);
    }
  };

  const saveSelectedAnswer = async (questionId, optionId) => {
    try {
      // logAnalyticsEvent('Give_answer','Play');
      const updatedAnswers = { ...selectedAnswer, [questionId]: optionId };
      setSelectedAnswer(updatedAnswers);
      await localStorage.setItem('selectedAnswers', JSON.stringify(updatedAnswers));
    } catch (err) {
      console.error('Error saving selected answer:', err.message || err);
    }
  };
  const giveAnswerFunc = async (questionId, optionKey) => {
    if (new Date(questionList[0]?.validUntil) > new Date(questionList[0]?.createdAt)) {
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
        saveSelectedAnswer(questionId, optionKey._id);
      } catch (err) {
        console.error("Error submitting answer:", err)
      }
    } else {
      error_notify("This quiz has been expired")
    }
  }


  const handleOptionPress = (questionId, option) => {
    if (selectedAnswer[questionId]) {
      error_notify('You have already selected an option for this question.');
      return;
    }

    // Ensure you have a valid user ID (e.g., from context or auth state)
    if (user?._id) {
      giveAnswerFunc(questionId, option);
    } else {
      error_notify('User not authenticated');
    }
  };
  const subscribeToChannel = (channelName, eventName, callback) => {
    const pusher = new Pusher(import.meta.env.VITE_APP_KEY, {
      cluster: import.meta.env.VITE_APP_CLUSTER
    })
    const channel = pusher.subscribe(channelName);

    channel.bind(eventName, (data) => {
      callback(data);
    });

    // Return the unsubscribe function
    return () => {
      channel.unbind(eventName);
      pusher.unsubscribe(channelName);
    };
  };

  useEffect(() => {
    // Ensure this effect only runs when the ID changes
    const unsubscribe = subscribeToChannel(
      `tournament-question-${id}`,
      `tournament-question-notification-${id}`,
      (data) => {
        // Check if the data is truly new to avoid unnecessary updates
        setQuestionList((prev) => {
          if (prev.length === 0 || prev[0].id !== data.id) {
            return [data]; // Only update if new data is different
          }
          return prev; // Avoid state update if data is unchanged
        });
        error_notify(data.message);
      }
    );

    const expire = subscribeToChannel(
      `expire-tournament-question`,
      `expire-tournament-question-notification`,
      (data) => {
        setQuestionList(data);
        // error_notify( data.message);
      }
    );

    return () => {
      unsubscribe(); // Unsubscribe from tournament question channel
      expire(); // Unsubscribe from expire tournament question channel
    };
  }, []); // Only re-run when the ID changes




  useEffect(() => {
    const timeDiff = questionList?.length > 0 && new Date(questionList[0]?.validUntil) - new Date(questionList[0]?.createdAt); // Milliseconds between dates

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
  }, [questionList]);

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
      <RightBar userDetails={userData}></RightBar>
      <div className="stream-content">
        <div className="top-cnt-wrap d-flex">
          <div className="watch-win">
            <h2>WATCH, PREDICT & WIN</h2>
            {questionList?.length > 0 ?
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
                              onClick={() => handleOptionPress(data?._id, x)}
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
              })
              :
              <h6 style={{color: "#fff"}}>No question added !!</h6>}
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
