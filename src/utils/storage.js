

export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getFromLocalStorage = key => {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : null
}

export const removeFromLocalStorage = key => {
  localStorage.removeItem(key)
}
// export const logAnalyticsEvent = async (event_name,screen_name) => {
//   await analytics().logEvent(event_name, {
//     screen_name: screen_name,
//   });
// }

