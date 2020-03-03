import axios from "axios"
import Host from "../../../config/host"

// TODOS : move to global
declare const process: {
  env: {
    NODE_ENV: string
  }
}

const { front } = Host[process.env.NODE_ENV]

// ref: https://github.com/axios/axios#global-axios-defaults
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded"

export default function request(
  method: string,
  url: string,
  formdata?: object
) {
  if (typeof window != "undefined") url = `${front}${url}`
  method = method.toLowerCase()
  return new Promise((resolve, reject) => {
    let config = {
      method,
      url,
      data: {}
    }
    if (method != "get") {
      if (formdata) {
        let formdata_input = new FormData()
        const keys = Object.keys(formdata)
        keys.map(n => {
          formdata_input.set(n, formdata[n])
        })

        config.data = formdata_input
      }
      // config.config = { headers: {'Content-Type': 'multipart/form-data' }}
    }
    return axios(config)
      .then((response: any = {}) => {
        const { status, data = {} } = response
        resolve({ status, data })
      })
      .catch((error: any) => reject(error))
  }).catch((error: any) => {
    console.error("API request error")
  })
}
