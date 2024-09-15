const BASE_URL = "http://localhost:8080";

export const GOOGLE_LOGIN = `${BASE_URL}/oauth2/authorization/google`;
export const GET_USER_INFO = `${BASE_URL}/api/user/info`;
export const LOGOUT = `${BASE_URL}/logout`;
export const CREATE_COACH_PROFILE = `${BASE_URL}/api/user/profile/coach`;
export const GET_COACH_PROFILE_DETAILS = `${BASE_URL}/api/coach/profile`;
export const CREATE_NEW_GYM = `${BASE_URL}/api/gym`;