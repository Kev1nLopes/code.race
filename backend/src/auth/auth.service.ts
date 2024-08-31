import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { Usuario } from 'src/usuarios/entities/usuario.entity'
import { UsuariosService } from 'src/usuarios/usuarios.service'
import { JwtPayload, JwtSign, Payload } from './auth.interface'

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private users: UsuariosService,
  ) {}

  public async validateUser(
    username: string,
    password: string,
  ): Promise<Partial<Usuario> | null> {
    const user = await this.users.getByEmail(username)

    if (!user) {
      return null
    }

    const checkPassword = await bcrypt.compare(password, user.senha)

    if (checkPassword) {
      const { senha, ...result } = user

      return result
    }

    return null
  }

  public jwtSign(data: Payload): JwtSign {
    const payload: JwtPayload = {
      sub: data.id,
      email: data.email,
      role: data.role,
      ativo: data.ativo,
    }

    return {
      access_token: this.jwt.sign(payload),
    }
  }
}
