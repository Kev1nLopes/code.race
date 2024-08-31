import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}


  @Get()
  async findAll(@Res() res) {
    const response = await this.logsService.findAll();
    res.status(response.status).message(response.message)
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const response = await this.logsService.findOne(+id);
    res.status(response.status)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logsService.remove(+id);
  }
}
