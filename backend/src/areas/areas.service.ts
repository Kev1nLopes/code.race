import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateAreaDto } from './dto/create-area.dto'
import { UpdateAreaDto } from './dto/update-area.dto'
import { Area } from './entities/area.entity'

@Injectable()
export class AreasService {
  /**
   *
   */
  constructor(
    @InjectRepository(Area)
    private readonly AreaRepository: Repository<Area>,
  ) {}

  async create(createAreaDto: CreateAreaDto) {
    try {
      if (createAreaDto.poligonos.perimetro.length == 0) {
        throw new BadRequestException('Informe um perimetro valido')
      }

      let novaArea = this.AreaRepository.create()
      novaArea.aprovado = false
      novaArea.poligonos = createAreaDto.poligonos
      novaArea.tipo = createAreaDto.tipo

      await this.AreaRepository.save(novaArea)

      return { status: 200, message: novaArea }
    } catch (error) {
      throw new BadRequestException('')
    }
  }

  async findAll() {
    try {
      let Areas = this.AreaRepository.find()

      return { status: 200, message: Areas }
    } catch (error) {
      console.log(' ~ AreasService ~ findAll ~ error:', error)
      throw new BadRequestException('Não foi possível consultar as areas')
    }
  }

  async findOne(id: number) {
    try {
      let Area = await this.AreaRepository.findOne({
        where: {
          id: id,
        },
      })
      if (!Area) throw new NotFoundException('Nenhuma area encontrada')

      return { status: 200, message: Area }
    } catch (error) {
      throw new BadRequestException('Não foi possível consultar a area')
    }
  }

  async update(id: number, updateAreaDto: UpdateAreaDto) {
    try {
      let Area = await this.AreaRepository.findOne({
        where: {
          id: id,
        },
      })

      if (!Area) throw new NotFoundException('Nenhuma area encontrada')

      return { status: 200, message: Area }
    } catch (error) {
      throw new BadRequestException('Não foi possível buscar a area')
    }
  }

  async remove(id: number) {
    try {
      let Area = await this.AreaRepository.findOne({
        where: {
          id: id,
        },
      })

      if (!Area) throw new NotFoundException('Nenhuma area encontrada')

      Area.ativa = false

      return { status: 200, message: 'Area removida com sucesso' }
    } catch (error) {
      throw new BadRequestException('Não foi possível remover a area')
    }
  }

  async aprovar(id: number) {
    try {
      let Area = await this.AreaRepository.findOne({
        where: {
          id: id,
        },
      })

      if (!Area) throw new NotFoundException('Nenhuma area encontrada')

      Area.aprovado = true

      await this.AreaRepository.save(Area)

      return { status: 200, message: 'Area aprovada com sucesso' }
    } catch (error) {
      throw new BadRequestException('Não foi possível aprovar a area')
    }
  }
}
