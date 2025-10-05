import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export const getMemberProfile = async (username) =>
  axios.get(`${API_BASE}/member/${username}/profile/`);

export const getMemberDashboard = async (username) =>
  axios.get(`${API_BASE}/member/${username}/dashboard/`);

export const getMemberDiets = async (username) =>
  axios.get(`${API_BASE}/member/${username}/diet/`);

export const getMemberWorkouts = async (username) =>
  axios.get(`${API_BASE}/member/${username}/workouts/`);

export const getMemberAttendance = async (username) =>
  axios.get(`${API_BASE}/member/${username}/attendance/`);

export const getMemberBMI = async (username) =>
  axios.get(`${API_BASE}/member/${username}/bmi/`);