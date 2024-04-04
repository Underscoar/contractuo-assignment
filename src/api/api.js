import axios from "axios"

export default class Api {
    constructor() {
        this.api = axios.create()
    }

    get(url, data) {
        return new Promise((resolve, reject) => {
            this.api
                .get(url, {params: data})
                .then(response => {
                    if (response.status !== 200) {
                        reject(response)
                    }

                    resolve(response)
                })
                .catch(error => {
                    console.error(`GET: error: ${error}`)
                    reject(error)
                })
        })
    }
}