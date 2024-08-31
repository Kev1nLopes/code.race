import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { MarkersService } from './markers.service';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { UpdateMarkerDto } from './dto/update-marker.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('pontos')
@ApiTags('Pontos')
export class MarkersController {
  constructor(private readonly markersService: MarkersService) {}

  @Post()
  @ApiBody({type: CreateMarkerDto})
  async create(@Body() createMarkerDto: CreateMarkerDto, @Res() res) {
    
    const response = await this.markersService.create(createMarkerDto);
    res.status(response.status).json(response.message)
  }

  @Get()
  async findAll(@Res() res) {
    const response = await this.markersService.findAll();
    res.status(response.status).json(response.message)
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const response = await this.markersService.findOne(+id);
    res.status(response.status).json(response.message)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMarkerDto: UpdateMarkerDto, @Res() res) {
    const response = await  this.markersService.update(+id, updateMarkerDto);
    res.status(response.status).json(response.message)

  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    const response = await this.markersService.remove(+id);
    res.status(response.status).json(response.message)
  }
}
