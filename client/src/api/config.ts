import axios from 'axios'
const baseURL = 'http://localhost:4000'

export const axiosConfig = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})
