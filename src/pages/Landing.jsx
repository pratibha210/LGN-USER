import React, { useState, useEffect } from "react"
import RightBarSmall from "../Compoonents/RightBarSmall"

import LeftBar from "../Compoonents/LeftBar"
import Header from "../Compoonents/Header"

import thumb1 from "../assets/img/thumb1.png"
import streamer from "../assets/img/streamer-img.png"
import { httpRequest } from "../services/Helper"
import { useAppContext } from "../context/AppContext"
import { useNavigate,useLocation } from "react-router-dom"

const Landing = () => {
  const navigate = useNavigate()
  const location = useLocation();

  const {
    setIsLoginLoading,
    error_notify,
    getLocalStorageData
  } = useAppContext()
  const [user, setUser] = useState({
    token: ""
  })
  const [activeTournament, setActiveTournament] = useState([])
  const [upcomingTournamen, setUpcomingTournament] = useState([])
  const userData = getLocalStorageData("user")
    .then(data => {
      setUser({ token: data?.token })
    })
    .catch(err => {
      console.log(err)
    })

  const getTournamentFeedFunc = async () => {
    setIsLoginLoading(true)
    try {
      const data = await httpRequest(
        "GET",
        `api/tournament/feed`,
        {},
        {},
        {
          "x-access-token": user?.token,
          "Content-Type": "application/json"
        }
      )

      setActiveTournament(data?.activeTournament)
      setUpcomingTournament(data?.upcomingTournamen)
    } catch (error) {
      error_notify("No questions found")
    } finally {
      setIsLoginLoading(false)
    }
  }

  useEffect(() => {
    getTournamentFeedFunc()
  }, [user?.token])

  const goToDetails = id => {
    window.location.href = `/home?id=${id}`
    // if(id){
    //   navigate(`/home?id=${id}`)
    //   window.location.reload();
    //     }else{
    //     console.log("No id found");
    // }
  }

  return (
    <React.Fragment>
      <Header></Header>
      <LeftBar></LeftBar>
      <RightBarSmall></RightBarSmall>
      <div className="listing-content">
        <div className="container-fluid mb-2 mb-sm-4">
          <h4>Top Streams</h4>
          <div className="row g-3">
            {activeTournament?.length > 0 ? (
              activeTournament?.map((data, index) => {
                return (
                  <div
                    id={data?._id}
                    className="col-sm-3"
                    onClick={() => goToDetails(data?._id)}
                  >
                    <div className="streaming_thumb">
                      <figure>
                        <img src={data?.image ? data?.image : thumb1} />
                        <span className="live">Live</span>
                      </figure>
                      <figcaption>
                        <span className="streaming_user_thumb">
                          <img src={streamer} />
                        </span>
                        <div className="streaming_content">
                          <h3>{data?.title}</h3>
                          <h5 className="video_meta">
                            {data?.game_name} | {data?.views} watching
                          </h5>
                          <h5 className="username">{data?.tournament_by}</h5>
                          <div className="streaming_meta">
                            {data?.tags &&
                              data?.tags?.map(x => {
                                return <label>{x}</label>
                              })}
                            {/* <label>Shooter</label>
                                                <label>Deathmatch</label> */}
                          </div>
                        </div>
                      </figcaption>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="col-sm-3">
                <div className="streaming_thumb">No Active Tournament !!</div>
              </div>
            )}
          </div>
        </div>

        <div className="container-fluid">
          <h4>Upcoming Live’s</h4>
          <div className="row g-3">
            {upcomingTournamen?.length > 0 ? (
              upcomingTournamen?.map((data, index) => {
                return (
                  <div className="col-sm-3" id={data?._id}>
                    <div className="streaming_thumb">
                      <figure>
                        <img src={data?.image ? data?.image : thumb1} />
                      </figure>
                      <figcaption>
                        <span className="streaming_user_thumb">
                          <img src={streamer} />
                        </span>
                        <div className="streaming_content">
                          <h3>{data?.title || "No Title Available"}</h3>
                          <h5 className="video_meta">
                            {data?.game_name} |{data?.views} watching
                          </h5>
                          <h5 className="username">{data?.tournament_by}</h5>
                          <div className="streaming_meta">
                            <label>English</label>
                            <label>Shooter</label>
                            <label>Deathmatch</label>
                          </div>
                        </div>
                      </figcaption>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="col-sm-3">
                <div className="streaming_content">
                  No Upcoming Tournament !!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Landing
