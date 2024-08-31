import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Post()
  @ApiBearerAuth()
  async create(@Body() createAreaDto: CreateAreaDto, @Res() res) {
    const response = await this.areasService.create(createAreaDto);
    res.status(response.status).json(response.message);
  }

  @Get()
  async findAll(@Res() res) {
    const response = await this.areasService.findAll();
    res.status(response.status).json(response.message)

  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const response = await this.areasService.findOne(+id);
    res.status(response.status).json(response.message)

  }

  @Patch(':id')
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateAreaDto: UpdateAreaDto, @Res() res) {
    const response = await this.areasService.update(+id, updateAreaDto);
    res.status(response.status).json(response.message)
  }

  @Delete(':id')
  @ApiBearerAuth()
  async remove(@Param('id') id: string, @Res() res) {
    const response = await this.areasService.remove(+id);
    res.status(response.status).json(response.message)
  }
}
