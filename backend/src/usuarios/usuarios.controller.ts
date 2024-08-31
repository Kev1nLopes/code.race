import { Body, Controller, Get, Patch, Req } from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { ReqUser } from 'src/decorators/req-user.decorator'
import { JWTUtil } from 'utils/jwt-util'
import { UpdateUsuarioDto } from './dto/update-usuario.dto'
import { Usuario } from './entities/usuario.entity'
import { UsuariosService } from './usuarios.service'
@Controller('usuarios')
@ApiTags('Usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Patch()
  @ApiBody({ type: UpdateUsuarioDto })
  update(@Body() updateUsuarioDto: UpdateUsuarioDto, @Req() req) {
    const token = JWTUtil.getDadosToken(req)
    return this.usuariosService.update(updateUsuarioDto)
  }

  remove(@Req() req) {
    const token = JWTUtil.getDadosToken(req)
    return this.usuariosService.remove(token)
  }
  
  @Get('@me')
  getUsuario(@ReqUser() user: Usuario) {
    return this.usuariosService.getByEmail(user.email)
  }
}
