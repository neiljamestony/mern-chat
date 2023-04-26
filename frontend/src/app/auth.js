import axios from "axios";
const env_var = import.meta.env;

export const _registerAuth = async (form_data) => {
  let data;
  try {
    let response = await axios.post(
      `${env_var.VITE_APP_DEVELOPMENT_LINK}/auth/register`,
      form_data
    );
    data = response.data;
  } catch (err) {
    data = err.message;
  }

  return data;
};

export const _fetchUsers = async (id) => {
  let data;
  try {
    let response = await axios.post(
      `${env_var.VITE_APP_DEVELOPMENT_LINK}/chat/users/`,
      id
    );
    data = response.data;
  } catch (err) {
    data = err.message;
  }
  return data;
};

export const _loginAuth = async (form_data) => {
  let data;
  try {
    const response = await axios.post(
      `${env_var.VITE_APP_DEVELOPMENT_LINK}/auth/login`,
      form_data
    );
    data = response.data;
  } catch (err) {
    data = err.message;
  }
  return data;
};

export const sendMsg = async (form_data) => {
  let data;
  try {
    const response = await axios.post(
      `${env_var.VITE_APP_DEVELOPMENT_LINK}/chat/addMsg`,
      form_data
    );
    data = response.data;
  } catch (err) {
    data = err.message;
  }
  return data;
};

export const getAllMsgs = async (form_data) => {
  let data;
  try {
    const response = await axios.post(
      `${env_var.VITE_APP_DEVELOPMENT_LINK}/chat/readMessages`,
      form_data
    );
    data = response.data;
  } catch (err) {
    data = err.message;
  }
  return data;
};
