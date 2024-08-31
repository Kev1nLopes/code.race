import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { RolesGuard } from 'src/auth/guards/roles.guard'
import { Roles } from 'src/decorators/roles.decorator'
import { UserRole } from 'src/usuarios/entities/usuario.entity'
import { AreasService } from './areas.service'
import { CreateAreaDto } from './dto/create-area.dto'
import { UpdateAreaDto } from './dto/update-area.dto'

@Controller('areas')
@UseGuards(RolesGuard)
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Post()
  @ApiBearerAuth()
  async create(@Body() createAreaDto: CreateAreaDto, @Res() res) {
    const response = await this.areasService.create(createAreaDto)
    res.status(response.status).json(response.message)
  }

  @Get()
  async findAll(@Res() res) {
    const response = await this.areasService.findAll()
    res.status(response.status).json(response.message)
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const response = await this.areasService.findOne(+id)
    res.status(response.status).json(response.message)
  }

  @Patch(':id')
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateAreaDto: UpdateAreaDto,
    @Res() res,
  ) {
    const response = await this.areasService.update(+id, updateAreaDto)
    res.status(response.status).json(response.message)
  }

  @Delete(':id')
  @ApiBearerAuth()
  async remove(@Param('id') id: string, @Res() res) {
    const response = await this.areasService.remove(+id)
    res.status(response.status).json(response.message)
  }

  @Patch(':id/aprovar')
  @Roles(UserRole.FISCAL, UserRole.INSTITUTION)
  async aprovar(@Param('id') id: string, @Res() res) {
    const response = await this.areasService.aprovar(+id)
    res.status(response.status).json(response.message)
  }
}
