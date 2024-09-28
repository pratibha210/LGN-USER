import React from "react"
import { Navigate } from "react-router-dom"
import { useAppContext } from "../context/AppContext"

export const ProtectedRoute = ({ element }) => {
  const { globalLoading } = useAppContext()
  if (globalLoading) {
    return <div>Loading...</div>
  }
  return localStorage.getItem("user") ? (
    <>{element}</>
  ) : (
    <Navigate to="/login" replace />
  )
}
