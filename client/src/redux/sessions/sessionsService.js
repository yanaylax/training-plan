import axios from "axios";

const API_URL = "/api/sessions/";

const getSessions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const addSession = async (sessionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, sessionData, config);
  return response.data;
};

const deleteSession = async (sessionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + sessionId, config);
  return response.data;
};

const updateSession = async (session, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.post(API_URL + session._id, session, config);
  return session;
};

const clearTrainingPlan = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "removeFromPlan", config);
  return response.data;
};

const sessionsService = {
  getSessions,
  addSession,
  deleteSession,
  updateSession,
  clearTrainingPlan,
};

export default sessionsService;
