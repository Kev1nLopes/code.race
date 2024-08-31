import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { RolesGuard } from 'src/auth/guards/roles.guard'
import { ReqUser } from 'src/decorators/req-user.decorator'
import { Roles } from 'src/decorators/roles.decorator'
import { UserRole, Usuario } from 'src/usuarios/entities/usuario.entity'
import { AreasService } from './areas.service'
import { CreateAreaDto } from './dto/create-area.dto'
import { UpdateAreaDto } from './dto/update-area.dto'

@Controller('areas')
@UseGuards(RolesGuard)
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Post()
  async create(@Body() createAreaDto: CreateAreaDto, @ReqUser() user: Usuario) {
    return this.areasService.create(createAreaDto, user)
  }

  @Get()
  @Roles(UserRole.FISCAL, UserRole.INSTITUTION)
  async findAll() {
    return this.areasService.findAll()
  }

  @Get('@me')
  async findAllByMe(@ReqUser() user: Usuario) {
    return this.areasService.findAllByMe(user)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.areasService.findOne(id)
  }

  @Patch(':id')
  @ApiBearerAuth()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAreaDto: UpdateAreaDto,
  ) {
    return this.areasService.update(+id, updateAreaDto)
  }

  @Delete(':id')
  @ApiBearerAuth()
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.areasService.remove(id)
  }

  @Patch(':id/aprovar')
  @Roles(UserRole.FISCAL, UserRole.INSTITUTION)
  async aprovar(@Param('id', ParseIntPipe) id: number) {
    return this.areasService.aprovar(id)
  }
}
