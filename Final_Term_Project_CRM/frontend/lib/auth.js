export const getUser = () => {
  if (typeof window === 'undefined') return null
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const getToken = () => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

export const saveAuth = (data) => {
  localStorage.setItem('token', data.token)
  localStorage.setItem('user', JSON.stringify({
    _id: data._id,
    name: data.name,
    email: data.email,
  }))
}

export const clearAuth = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export const isAuthenticated = () => !!getToken()
