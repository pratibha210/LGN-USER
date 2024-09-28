import React, { useMemo, useState } from "react"
import logo from "../assets/img/logo.png"
import google from "../assets/img/Google.png"
import { ThreeCircles } from "react-loader-spinner"
import { httpRequest } from "../services/Helper"
import { useAppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"

function Register() {
  const [loginInfo, setLoginInfo] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  })
  const [loginError, setLoginError] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  })
  const {
    login,
    isLoginLoading,
    setIsLoginLoading,
    success_notify,
    error_notify,
    isLoggeg_in,
    isLoggedin
  } = useAppContext()
  const navigate = useNavigate()
  // handle Email validation
  const validateEmail = useMemo(() => {
    return email => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  }, [loginInfo?.email])

  // handle Phone number validation
  const validatePhoneNumber = useMemo(() => {
    return phoneNumber => {
      const phoneRegex = /^[0-9]{10}$/
      return phoneRegex.test(phoneNumber)
    }
  }, [loginInfo?.mobile])

  const validatePassword = useMemo(() => {
    return password => {
      const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
      // console.log(passwordPattern.test(password), "shfjkd");
      return passwordPattern.test(password)
    }
  }, [loginInfo?.password])

  // Handle Input
  const handleInput = event => {
    const { name, value } = event.target
    switch (name) {
      case "email":
        if (!validateEmail(value)) {
          setLoginError(prev => ({
            ...prev,
            email: "Invalid email address"
          }))
        } else {
          setLoginError(prev => ({
            ...prev,
            email: ""
          }))
        }
        break
      case "mobile":
        if (!validatePhoneNumber(value)) {
          setLoginError(prev => ({
            ...prev,
            mobile: "Invalid phone number"
          }))
        } else {
          setLoginError(prev => ({
            ...prev,
            mobile: ""
          }))
        }
        break
      case "password":
        if (!validatePassword(value)) {
          setLoginError(prev => ({
            ...prev,
            password:
              "Password must be at least 8 characters long and include at least one digit, one lowercase letter, and one uppercase letter."
          }))
        } else {
          setLoginError(prev => ({
            ...prev,
            password: ""
          }))
        }
        break
      case "confirmPassword":
        if (value !== loginInfo?.password) {
          setLoginError(prev => ({
            ...prev,
            confirmPassword: "Password must be same."
          }))
        } else {
          setLoginError(prev => ({
            ...prev,
            confirmPassword: ""
          }))
        }
        break

      default:
        break
    }
    setLoginInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // handle Submit
  const handleLoginSubmit = async () => {
    try {
      setIsLoginLoading(true)
      const headers = {
        "Content-Type": "application/json"
      }
      const data = await httpRequest(
        "POST",
        "api/auth/register",
        loginInfo,
        {},
        headers
      )
      navigate("/login")
      success_notify("Registered success")
    } catch (error) {
      if (error.status === 401) {
        error_notify("Registered Failure")
      }
      // error_notify('User name or password wrong');
    } finally {
      setIsLoginLoading(false)
    }
  }

  return (
    <div className="login-wrap">
      <div className="logo">
        <a href="#">
          <img src={logo} />
        </a>
      </div>
      <div className="action-area">
        <div className="container">
          <div className="row">
            <div className="col-sm-5 col-md-6">
              <div className="form-area">
                <h2>Create New Account</h2>
                <div className="action-form">
                  <input
                    type="text"
                    value={loginInfo?.name}
                    name="name"
                    id="name"
                    placeholder="User Name"
                    onChange={e => handleInput(e)}
                  />
                  <p className="loginTextError">{loginError?.name}</p>
                  <input
                    type="email"
                    value={loginInfo?.email}
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    onChange={e => handleInput(e)}
                  />
                  <p className="loginTextError">{loginError?.mobile}</p>
                  <input
                    type="text"
                    value={loginInfo?.mobile}
                    name="mobile"
                    id="mobile"
                    placeholder="Mobile Number"
                    onChange={e => handleInput(e)}
                  />
                  <p className="loginTextError">{loginError?.mobile}</p>
                  <input
                    type="text"
                    value={loginInfo?.password}
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={e => handleInput(e)}
                  />
                  <p className="loginTextError">{loginError?.password}</p>
                  <input
                    type="text"
                    value={loginInfo?.confirmPassword}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={e => handleInput(e)}
                  />
                  <p className="loginTextError">
                    {loginError?.confirmPassword}
                  </p>
                  <button
                    className="btn main-btn"
                    disabled={
                      loginError?.name !== "" ||
                      loginError?.email !== "" ||
                      loginError?.mobile !== "" ||
                      loginError?.password !== "" ||
                      loginError?.confirmPassword !== "" ||
                      loginInfo?.name === "" ||
                      loginInfo?.email === "" ||
                      loginInfo?.mobile === "" ||
                      loginInfo?.password === "" ||
                      loginInfo?.confirmPassword === ""
                    }
                    onClick={() => handleLoginSubmit()}
                  >
                    Register
                    <ThreeCircles
                      visible={isLoginLoading ? true : false}
                      height="20"
                      width="20"
                      color="#ffff"
                      ariaLabel="three-circles-loading"
                      wrapperStyle={{ marginLeft: "10px" }}
                      wrapperClass=""
                    />
                  </button>
                </div>
                <div className="add-field">
                  <p className="divider">Or Log in with</p>
                  <a href="#" className="btn white-btn">
                    <img src={google} />
                  </a>
                  <h2>
                    Already Have an account? <a href="/login">Log In</a>
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6">
              <div className="lgn-banner">
                <h2>
                  LET’S <span>GAME NOW</span>
                </h2>
                <p>Best Live Streaming platform in India</p>
                <div className="btn-wrap d-flex">
                  <a href="#" className="btn main-btn">
                    Start Watching
                  </a>
                  <a href="#" className="btn black-btn">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="login-footer">
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Career</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Help</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy </a>
              </li>
              <li>
                <a href="#">Sitemap</a>
              </li>
            </ul>
            <p>
              &copy;<span>Copyrights Basus Hall of Game.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
