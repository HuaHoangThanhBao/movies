import axios, { AxiosInstance } from 'axios'
import { baseURL } from '../constants'
import { bearerToken } from '../constants/url';

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: baseURL,
      timeout: 10000
    })
    this.instance.interceptors.request.use((config) => {
      if(config.headers) {
        config.headers.Authorization = `Bearer ${bearerToken}`
      }
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
    this.instance.interceptors.response.use((config) => {
      return config
    })
  }
}

export const http = new Http().instance
