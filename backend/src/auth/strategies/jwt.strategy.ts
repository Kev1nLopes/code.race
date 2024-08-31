import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { JwtPayload, Payload } from '../auth.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.PRIVATE_KEY,
    })
  }

  validate(payload: JwtPayload): Payload {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      ativo: payload.ativo,
    }
  }
}
