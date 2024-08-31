import { Usuario } from '@/features/usuario/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { z } from 'zod'
import useApi from './useApi'
export type SessionContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  user: Usuario | null
  setUser: (user: Usuario | null) => void
  signIn: (fields: LoginFields) => Promise<void>
  signOut: () => void
}

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Campo obrigatório' })
    .email({ message: 'E-mail inválido' }),
  senha: z.string({ required_error: 'Campo obrigatório' }),
})

export type LoginFields = z.infer<typeof loginSchema>

export const SessionContext = createContext<SessionContextType>(null!)

export function SessionProvider(props: PropsWithChildren) {
  const { api } = useApi()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<Usuario | null>(null)

  async function signIn(fields: LoginFields) {
    api.post('/auth/signin', fields).then(res => {
      setUser(res.data.user)
      setIsAuthenticated(true)
      AsyncStorage.setItem('token', res.data.accessToken)
    })
  }

  function signOut() {
    setUser(null)
    setIsAuthenticated(false)
    AsyncStorage.removeItem('token')
  }

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        api.get('/usuarios/@me').then(res => {
          setUser(res.data)
          setIsAuthenticated(true)
        })
      }
    })
  })

  return (
    <SessionContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        signIn,
        signOut,
      }}
      {...props}
    />
  )
}

export const useSession = () => useContext(SessionContext)
