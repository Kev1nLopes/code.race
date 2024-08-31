import axios from "axios";

export default function useApi() {
    const api = axios.create({
        baseURL: "http://10.0.0.158:3000/"
    })

    return { api }
}