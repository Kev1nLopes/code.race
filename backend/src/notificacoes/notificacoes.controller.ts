import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { NotificacoesService } from './notificacoes.service';
import { CreateNotificacoeDto } from './dto/create-notificacoe.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('notificacoes')
@ApiTags('Notificacoes')
export class NotificacoesController {
  constructor(private readonly notificacoesService: NotificacoesService) {}

  @Post()
  @ApiBody({type: CreateNotificacoeDto})
  async create(@Body() createNotificacoeDto: CreateNotificacoeDto, @Res() res) {

    const response = await this.notificacoesService.create(createNotificacoeDto);
    res.status(response.status).message(response.message)
  }

  @Get()
  async findAll(@Res() res) {
    
    const response = await this.notificacoesService.findAll();
    res.status(response.status).message(response.message)    
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const response = await this.notificacoesService.findOne(+id);
    res.status(response.status).message(response.message)

  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    const response = await  this.notificacoesService.remove(+id);
    res.status(response.status).message(response.message)

  }
}
