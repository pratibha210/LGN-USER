import React, { useEffect, useMemo, useState } from "react"
import logo from "../assets/img/logo.png"
import google from "../assets/img/Google.png"
import { ThreeCircles } from "react-loader-spinner"
import { httpRequest } from "../services/Helper"
import { useAppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"
import { auth, googleProvider } from '../firebase/firebase.config';
import { signInWithPopup } from 'firebase/auth';
function Login() {
  const [loginInfo, setLoginInfo] = useState({
    userName: "",
    password: ""
  })
  const [loginError, setLoginError] = useState({
    userName: "",
    password: ""
  })
  const {
    login,
    isLoginLoading,
    setIsLoginLoading,
    success_notify,
    error_notify
  } = useAppContext()
  const navigate = useNavigate()
  // handle Email validation
  const validateEmail = useMemo(() => {
    return email => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  }, [loginInfo?.userName])

  const validatePassword = useMemo(() => {
    return password => {
      const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
      return passwordPattern.test(password)
    }
  }, [loginInfo?.password])

  // Handle Input
  const handleInput = event => {
    const { name, value } = event.target
    switch (name) {
      case "userName":
        if (!validateEmail(value)) {
          setLoginError(prev => ({
            ...prev,
            userName: "Invalid email address"
          }))
        } else {
          setLoginError(prev => ({
            ...prev,
            userName: ""
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
    setIsLoginLoading(true)
    try {
      const data = await httpRequest(
        "POST",
        "api/auth/login",
        loginInfo,
        {},
        { "Content-Type": "application/json" }
      )
      login({ ...data.user?.others, token: data.token })
      success_notify("Login successful!")
      navigate("/")
    } catch (error) {
      error_notify("Invalid credentials")
    } finally {
      setIsLoginLoading(false)
    }
  }

      // const signInWithGoogle = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const response = await GoogleSignin.signIn();
    //         if (isSuccessResponse(response)) {
    //             console.log(response.data);
    //             const { idToken } = response.data;
    //             const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    //             console.log('aaa', googleCredential)
    //             const savedData =await auth().signInWithCredential(googleCredential);
    //             console.log('bbb', savedData)
    //             return savedData
    //         } else {
    //             console.log("error");

    //         }
    //     } catch (error) {
    //         console.log('Error details:', error);
    //         if (isErrorWithCode(error)) {
    //             switch (error.code) {
    //                 case statusCodes.IN_PROGRESS:
    //                     console.log("Sign-in in progress");
    //                     break;
    //                 case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
    //                     console.log("Play services not available");
    //                     break;
    //                 default:
    //                     console.log("Error code:", error.code);
    //                     console.log("Error message:", error.message);
    //             }
    //         } else {
    //             console.log("General error:", error);
    //         }
    //     }

    // };

    const signInWithGoogle = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const userd = result.user;
        const idToken = await userd.getIdToken();
        const {email,displayName,uid,photoURL} = userd;
        // Send the idToken to your backend for verification
        const response = await fetch(`${import.meta.env.VITE_APP_LOCAL_BASE_URL}/api/auth/google-login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idToken,email,displayName,uid,photoURL,platform:'web' }),
        });
    
        const data = await response.json();
        const {token, user}  = data;
            login({ ...user.user?.others, token });
            success_notify("Login successful!");
            navigate("/");
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    if (localStorage.getItem("user") && location.pathname === "/login") {
      navigate("/")
    }
  }, [location.pathname])

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
                    value={loginInfo?.userName}
                    name="userName"
                    id=""
                    placeholder="Email Address"
                    onChange={e => handleInput(e)}
                  />
                  <p className="loginTextError">{loginError?.userName}</p>
                  <input
                    type="text"
                    value={loginInfo?.password}
                    name="password"
                    id=""
                    placeholder="Password"
                    onChange={e => handleInput(e)}
                  />
                  <p className="loginTextError">{loginError?.password}</p>
                  <button
                    className="btn main-btn"
                    disabled={
                      loginError?.password !== "" ||
                      loginError?.userName !== "" ||
                      loginInfo?.userName === "" ||
                      loginInfo?.password === ""
                    }
                    onClick={() => handleLoginSubmit()}
                  >
                    Log In
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
                  <button href="#" className="btn white-btn" onClick={()=>signInWithGoogle()}>
                    <img src={google} />
                  </button>
                  <h2>
                    Already Have an account? <a href="/register">Sign Up</a>
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

export default Login
