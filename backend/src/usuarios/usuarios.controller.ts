import { Body, Controller, Patch, Req } from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { JWTUtil } from 'utils/jwt-util'
import { UpdateUsuarioDto } from './dto/update-usuario.dto'
import { UsuariosService } from './usuarios.service'
@Controller()
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @ApiTags('Usuarios')
  @Patch()
  @ApiBody({ type: UpdateUsuarioDto })
  update(@Body() updateUsuarioDto: UpdateUsuarioDto, @Req() req) {
    const token = JWTUtil.getDadosToken(req)
    return this.usuariosService.update(updateUsuarioDto)
  }

  @ApiTags('Usuarios')
  remove(@Req() req) {
    const token = JWTUtil.getDadosToken(req)
    return this.usuariosService.remove(token)
  }
}
