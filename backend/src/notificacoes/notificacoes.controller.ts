import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { Public } from 'src/decorators/public.decorator'
import { ReqUser } from 'src/decorators/req-user.decorator'
import { Usuario } from 'src/usuarios/entities/usuario.entity'
import { CreateNotificacoeDto } from './dto/create-notificacoe.dto'
import { NotificacoesService } from './notificacoes.service'

@Controller('notificacoes')
@ApiTags('Notificacoes')
export class NotificacoesController {
  constructor(private readonly notificacoesService: NotificacoesService) {}

  @Post()
  @ApiBody({ type: CreateNotificacoeDto })
  async create(
    @Body() createNotificacoeDto: CreateNotificacoeDto,
    @ReqUser() user: Usuario,
  ) {
    return this.notificacoesService.create(createNotificacoeDto, user)
  }

  @Get()
  @Public()
  async findAll() {
    return this.notificacoesService.findAll()
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string, @Res() res) {
    const response = await this.notificacoesService.findOne(+id)
    res.status(response.status).json(response.message)
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    const response = await this.notificacoesService.remove(+id)
    res.status(response.status).message(response.message)
  }
}
