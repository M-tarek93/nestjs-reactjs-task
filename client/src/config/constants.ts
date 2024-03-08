const constants = {
  BACKEND_BASE_URL: process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost:3000',
  REGISTER_API: '/api/users',
  LOGIN_API: '/api/auth/login',
  PROFILE_API: '/api/users/me',
  PRIMARY_COLOR: '#e96952',
}

export default constants;