import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { UpdateMarkerDto } from './dto/update-marker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Marker } from './entities/marker.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MarkersService {
  /**
   *
   */
  constructor(
    @InjectRepository(Marker)
    private readonly markerRepository: Repository<Marker>
  ) {

  }
  
  async create(createMarkerDto: CreateMarkerDto) {
    try{
      const novoMarker = this.markerRepository.create()
      novoMarker.descricao = createMarkerDto.descricao
      novoMarker.latitude = createMarkerDto.latitude
      novoMarker.longitude = createMarkerDto.longitude
    
      await this.markerRepository.save(novoMarker)

      return { status: 200, message: 'Ponto criado com sucesso'}


    }catch(error){
      throw new BadRequestException('Não foi possível criar o ponto')
    }
  }

  async findAll() {
    try{
      let Markers = await this.markerRepository.find()

      return { status: 200, message: Markers}

    }catch(error){
      throw new BadRequestException('Não foi possível consultar os Pontos')
    }
  }

  async findOne(id: number) {
    try{
      let marker = await this.markerRepository.findOne({
        where: {
          id: id
        }
      })

      if(!marker) { return { status: 404, message: 'Nenhum ponto encontrado'}}

      return { status: 200, message: marker}
    }catch(error){
      throw new BadRequestException('Não foi possível consultar o Ponto')
    }
  }

  async update(id: number, updateMarkerDto: UpdateMarkerDto) {
    try{
      let marker = await this.markerRepository.findOne({
        where: {
          id: id
        }
      })

      if(!marker) return { status: 404, message: 'Nenhum ponto encontrado'}

      for (const key of Object.keys(updateMarkerDto)) {
        if(Object.keys(marker).includes(key)){
          marker[key] = updateMarkerDto[key]
        }
      }

      await this.markerRepository.save(marker)

      return { status: 200, message: 'Ponto atualizado com sucesso'}
    }catch(error){
      throw new BadRequestException('Não foi possível atualizar o ponto')
    }
    
  }

  async remove(id: number) {
    try{
      let marker = await this.markerRepository.findOne({
        where: {
          id: id
        }
      })

      if(!marker) return { status: 404, message: 'Nenhum Ponto encontrado'}

      marker.ativo = false

      await this.markerRepository.save(marker)

      return { status: 200, message: 'Ponto removido com sucesso!'}
    }catch(error){
      throw new BadRequestException('Não foi possível remover o ponto')
    }
  }
}
