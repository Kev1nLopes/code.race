import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common'
import { Request } from 'express'
import { UsuariosService } from 'src/usuarios/usuarios.service'

export class DuplicateUserGuard implements CanActivate {
  constructor(@Inject(UsuariosService) private users: UsuariosService) {}

  public async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>()

    const user = await this.users.getByEmail(req.body.email).catch(() => null)

    if (user) {
      throw new BadRequestException(
        'There is already an user with this email registered',
      )
    }

    return true
  }
}
