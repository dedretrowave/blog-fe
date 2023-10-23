import axios from 'axios';
import globalSettings from "../Settings/globalSettings";

const instance = axios.create({
  baseURL: `${globalSettings.BASE_URL}`,
});

instance.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: localStorage
      .getItem(globalSettings.LOCAL_STORAGE_TOKEN_PATH),
    'Content-Type': "application/json",
  }

  return config;
});

export default instance;