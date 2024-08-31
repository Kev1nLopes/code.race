import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Public } from 'src/decorators/public.decorator'
import { ReqUser } from 'src/decorators/req-user.decorator'
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto'
import { Usuario } from 'src/usuarios/entities/usuario.entity'
import { UsuariosService } from 'src/usuarios/usuarios.service'
import { AuthService } from './auth.service'
import { DuplicateUserGuard } from './guards/duplicate-user.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private auth: AuthService,
    private users: UsuariosService,
  ) {}

  @Public()
  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  public signin(@ReqUser() user: Usuario) {
    const tokens = this.auth.jwtSign(user)

    return { user, accessToken: tokens.access_token }
  }

  @Public()
  @Post('/signup')
  @UseGuards(DuplicateUserGuard)
  public async signup(@Body() newUser: CreateUsuarioDto) {
    const user = await this.users.create(newUser)

    return this.signin(user)
  }
}
