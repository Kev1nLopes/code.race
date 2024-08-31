import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export default function useApi() {
  const api = axios.create({
    baseURL: 'http://192.168.100.124:3000',
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
