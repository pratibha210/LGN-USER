import React, { useState } from "react"
import smalllogo from "../assets/img/logo-small.png"
import more from "../assets/img/more.png"
import search from "../assets/img/search.png"
import points from "../assets/img/points.png"
import bell from "../assets/img/bell-icon.png"
import user from "../assets/img/user.png"
import { useAppContext } from "../context/AppContext"

function Header() {
  const { getLocalStorageData } = useAppContext()
  const [userDetails, setUserDetails] = useState({
    name: ""
  })
  const userData = getLocalStorageData("user")
    .then(data => {
      setUserDetails({ name: data?.name })
    })
    .catch(err => {
      console.log(err)
    })
  return (
    <nav className="navbar navbar-expand-lg top-bar">
      <div className="container-fluid">
        <div className="left-wrap d-flex align-items-center">
          <a className="navbar-brand" href="#">
            <img src={smalllogo} alt="" />
          </a>
          <ul className="d-flex align-items-center">
            <li>
              <a href="#">Following</a>
            </li>
            <li>
              <a href="#">Browse</a>
            </li>
            <li>
              <a href="#">
                <img src={more} alt="" />
              </a>
            </li>
          </ul>
        </div>

        <ul className="navbar-nav search-bar">
          <li className="nav-item">
            <div className="search-container">
              <a href="#">
                <img src={search} alt="" />
              </a>
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />
            </div>
          </li>
        </ul>

        <div className="right-wrap d-flex align-items-center">
          <div className="reward-wrap ">
            <a href="#" className="d-flex">
              200 <img src={points} alt="" />
            </a>
          </div>
          {/* <a href="#"><img src={chat} alt="" /></a> */}
          <a href="#">
            <img src={bell} alt="" />
          </a>
          <div className="profile-wrap d-flex align-items-center">
            <a href="#">
              <img src={user} alt="" />
            </a>
            <div className="profile-detail d-flex align-items-start">
              <h2>
                {userDetails?.name}
                <br />
                {/* <span>#2930</span> */}
              </h2>
              {/* <img src={dropdown} alt="" /> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
