import { UserRole } from 'src/usuarios/entities/usuario.entity'

export interface JwtSign {
  access_token: string
}

export interface JwtPayload {
  sub: number
  email: string
  role: UserRole
  ativo: boolean
}

export interface Payload {
  id: number
  email: string
  role: UserRole
  ativo: boolean
}
