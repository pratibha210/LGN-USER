import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import "./assets/style.css"
import Home from "./pages/Home"
import About from "./pages/About"
import Login from "./Compoonents/Login"
import Store from "./pages/Store"
import Profile from "./pages/Profile"
import Answer from "./pages/Answer"
import LeaderBoard from "./pages/LeaderBoard"
import Landing from "./pages/Landing"
import { Toaster } from "react-hot-toast"
import Register from "./Compoonents/Register"
import { ProtectedRoute } from "./Compoonents/ProtectedRoute"
import { Root } from "./pages/Root"
const router = createBrowserRouter([
  {
    path: "",
    element: <ProtectedRoute element={<Root />} />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute element={<Landing />} />
      },
      {
        path: "home",
        element: <ProtectedRoute element={<Home />} />
      },

      {
        path: "store",
        element: <ProtectedRoute element={<Store />} />
      },
      {
        path: "profile",
        element: <ProtectedRoute element={<Profile />} />
      },
      {
        path: "answer/:index",
        element: <ProtectedRoute element={<Answer />} />
      },
      {
        path: "leaderboard",
        element: <ProtectedRoute element={<LeaderBoard />} />
      },
      {
        path: "about",
        element: <ProtectedRoute element={<About />} />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
])

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  )
}

export default App
