/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from "axios";


// type EntityErrorPayload = {
//     message: string
//     errors: {
//       field: string
//       message: string
//     }[]
//   }
  


class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:8001/",
      timeout: 20000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    
  }
}





const http = new Http().instance;

export default http;



// export class HttpError extends Error {
//     status: number
//     payload: {
//       message: string
//       [key: string]: any
//     }
//     constructor({ status, payload }: { status: number; payload: any }) {
//       super(`HTTP Error: ${status}`)
//       this.status = status
//       this.payload = payload
//     }
//   }
  
//   export class EntityError extends HttpError {
//     status: number
//     payload: EntityErrorPayload
//     constructor({ status, payload }: { status: 422; payload: EntityErrorPayload }) {
//       super({ status, payload })
//       this.status = status
//       this.payload = payload
//     }
//   }