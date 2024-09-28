import React, { createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

const AppContext = createContext(undefined)

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoggedin, setLoggedin] = useState(null)
  const [isLoginLoading, setIsLoginLoading] = useState(null)
  const [globalLoading, setGlobalLoading] = useState(null)
  const setLocalStorage = async user => {
    const userJson = JSON.stringify(user)
    localStorage.setItem("user", userJson)
  }
  const getLocalStorageData = async key => {
    const userJson = localStorage.getItem(key)
    if (userJson) {
      return JSON.parse(userJson)
    }
    return null
  }

  const login = userData => {
    setUser(userData)
    setLoggedin(true)
    setLocalStorage(userData)
  }

  const logout = () => {
    setUser(null)
    localStorage.clear()
  }

  const isLoggeg_in = async () => {
    setGlobalLoading(true)
    const user = await getLocalStorageData("user")
    // console.log(user,"user");

    if (user) {
      setUser(user)
      setLoggedin(true)
    } else {
      setLoggedin(false)
    }
    setGlobalLoading(false) // Ensure loading is set to false once checked
  }

  useEffect(() => {
    isLoggeg_in() // Check login status on app load
  }, [])

  const success_notify = message => toast.success(message)
  const error_notify = message => toast.error(message)

  return (
    <AppContext.Provider
      value={{
        user,
        setGlobalLoading,
        getLocalStorageData,
        globalLoading,
        login,
        logout,
        isLoginLoading,
        setIsLoginLoading,
        isLoggedin,
        success_notify,
        error_notify,
        isLoggeg_in
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
