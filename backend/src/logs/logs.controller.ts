import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@Controller('logs')
@ApiTags('Logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Public()
  @Get()
  async findAll(@Res() res) {
    const response = await this.logsService.findAll();
    res.status(response.status).message(response.message)
  }

  @Public()
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
