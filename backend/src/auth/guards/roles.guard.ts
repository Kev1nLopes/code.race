import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserRole, Usuario } from 'src/usuarios/entities/usuario.entity'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const roles =
      this.reflector.get<UserRole[]>('roles', context.getHandler()) || []
    const rolesClass =
      this.reflector.get<UserRole[]>('roles', context.getClass()) || []

    const req = context.switchToHttp().getRequest()

    if (!roles.length && !rolesClass.length) {
      return true
    }

    const allRoles = [...roles, ...rolesClass]

    const user: Usuario = req.user

    if (!user) {
      throw new InternalServerErrorException('Cannot verify user authorization')
    }

    if (!allRoles.includes(user.role)) {
      throw new UnauthorizedException("You don't have enough permission")
    }

    return true
  }
}
