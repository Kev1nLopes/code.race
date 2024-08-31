import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Usuario } from 'src/usuarios/entities/usuario.entity'
import { Repository } from 'typeorm'
import { CreateAreaDto } from './dto/create-area.dto'
import { UpdateAreaDto } from './dto/update-area.dto'
import { Area } from './entities/area.entity'

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
  ) {}

  async create(createAreaDto: CreateAreaDto, user: Usuario) {
    try {
      if (createAreaDto.poligonos.perimetro.length == 0) {
        throw new BadRequestException('Informe um perimetro valido')
      }

      let novaArea = this.areaRepository.create()
      novaArea.nome = createAreaDto.nome
      novaArea.aprovado = false
      novaArea.poligonos = createAreaDto.poligonos
      novaArea.tipo = createAreaDto.tipo
      novaArea.createdBy = user

      return this.areaRepository.save(novaArea)
    } catch (error) {
      throw new BadRequestException('Não foi possível cadastrar o usuário')
    }
  }

  async findAll() {
    try {
      return this.areaRepository.find()
    } catch (error) {
      console.log(' ~ AreasService ~ findAll ~ error:', error)
      throw new BadRequestException('Não foi possível consultar as areas')
    }
  }

  async findAllByMe(user: Usuario) {
    try {
      return this.areaRepository.findBy({
        createdBy: {
          id: user.id,
        },
      })
    } catch (error) {
      console.log(' ~ AreasService ~ findAll ~ error:', error)
      throw new BadRequestException('Não foi possível consultar as areas')
    }
  }

  async findOne(id: number) {
    try {
      let area = await this.areaRepository.findOne({
        where: {
          id: id,
        },
      })

      if (!area) throw new NotFoundException('Nenhuma area encontrada')

      return area
    } catch (error) {
      throw new BadRequestException('Não foi possível consultar a area')
    }
  }

  async update(id: number, updateAreaDto: UpdateAreaDto) {
    try {
      const area = await this.findOne(id)

      area.tipo = updateAreaDto.tipo
      area.poligonos = updateAreaDto.poligonos

      return this.areaRepository.save(area)
    } catch (error) {
      throw new BadRequestException('Não foi possível buscar a area')
    }
  }

  async remove(id: number) {
    try {
      let area = await this.findOne(id)

      area.ativa = false

      return this.areaRepository.save(area)
    } catch (error) {
      throw new BadRequestException('Não foi possível remover a area')
    }
  }

  async aprovar(id: number) {
    try {
      let area = await this.findOne(id)

      area.aprovado = true

      return this.areaRepository.save(area)
    } catch (error) {
      throw new BadRequestException('Não foi possível aprovar a area')
    }
  }
}
