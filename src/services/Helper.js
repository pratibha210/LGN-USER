import axios from "axios"

export const httpRequest = async (
  method,
  endPoint,
  data = null,
  params = {},
  headers
) => {
  try {
    const url = `${import.meta.env.VITE_APP_LOCAL_BASE_URL}/${endPoint}`
    const response = await axios({
      method,
      url,
      params,
      headers,
      data
    })

    return response.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export const getLocalStorage = async key => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}
