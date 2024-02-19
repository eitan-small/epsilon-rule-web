import axios from 'axios';
import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosRequestHeaders,
} from 'axios';
import { Message } from '@arco-design/web-vue';
import { getToken } from '@/utils/auth';

export interface HttpResponse<T = unknown> {
  status: number;
  msg: string;
  code: number;
  data: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {} as AxiosRequestHeaders;
      }
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  },
);
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      Message.error({
        content: res.message || 'Error',
        duration: 5 * 1000,
      });
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res;
  },
  (error) => {
    Message.error({
      content: error.message || 'Request Error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);
