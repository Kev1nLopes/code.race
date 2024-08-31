import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export default function useApi() {
  const api = axios.create({
    baseURL: 'http://10.0.0.158:3000',
  })

  api.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

  return { api }
}
