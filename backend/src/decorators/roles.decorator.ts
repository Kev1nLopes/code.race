import { SetMetadata } from '@nestjs/common'
import { UserRole } from 'src/usuarios/entities/usuario.entity'

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles)
