import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Token } from 'types/Token';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from './entities/area.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AreasService {

  /**
   *
   */
  constructor(
    @InjectRepository(Area)
    private readonly AreaRepository: Repository<Area>
  ) {
    
  }

  async create(createAreaDto: CreateAreaDto) {
    try{
      if(createAreaDto.poligonos.perimetro.length == 0){
        throw new BadRequestException('Informe um perimetro valido')
      }

      let novaArea = this.AreaRepository.create();
      novaArea.aprovado = false
      novaArea.poligonos = createAreaDto.poligonos
      novaArea.tipo = createAreaDto.tipo


      await this.AreaRepository.save(novaArea)

      return { status: 200, message: { msg: 'Area criada com sucesso', data: novaArea}}


      
    }catch(error){
      throw new BadRequestException('')
    }
  }

  findAll() {
    try{


    }catch(error){
      throw new BadRequestException('')
    }
  }

  findOne(id: number) {
    try{


    }catch(error){
      throw new BadRequestException('')
    }
  }

  update(id: number, updateAreaDto: UpdateAreaDto) {
    try{


    }catch(error){
      throw new BadRequestException('')
    }
  }

  remove(id: number) {
    try{


    }catch(error){
      throw new BadRequestException('')
    }
  }
}
