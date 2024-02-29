import axios from "axios";

export const axiosInstance=axios.create({
  // baseURL:'http://localhost:9000'
  baseURL:'https://samplechatserver.vercel.app'
})

// export const baseURL='http://localhost:9000'
export const baseURL='https://samplechatserver.vercel.app'