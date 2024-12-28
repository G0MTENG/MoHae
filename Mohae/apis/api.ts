import axios from 'axios'

export const api = axios.create({
  baseURL: `${process.env.BACKEND_URL}/api`,
  timeout: 5000,
  withCredentials: true,
})
