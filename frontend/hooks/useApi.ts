import axios from "axios";

export default function useApi() {
    const api = axios.create({
        baseURL: "http://localhost:3000/"
    })

    return { api }
}