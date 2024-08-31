import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log)
    private readonly LogRespository: Repository<Log>
  ) {

  }

  async create(createLogDto: CreateLogDto){
    try{
      let Log = this.LogRespository.create()
      Log.descricao = createLogDto.descricao
      Log.usuario = createLogDto.usuario
    }catch(error){
      throw new BadRequestException('Não foi possível consultar os logs')
    }
  }


  async findAll() {
    try{
      
      let Logs = await this.LogRespository.find()

      return { status: 200, message: Logs}
    }catch(error){
      throw new BadRequestException('Não foi possível consultar os logs')
    }
  }

  async findOne(id: number) {
    try{
      const Log = await this.LogRespository.findOne({
        where: {
          id: id
        }
      }) 

      if(!Log) return { status: 400, message: 'Nenhum Log encontrado'}
      
      return { status: 200, message: Log }
    }catch(error){
      throw new BadRequestException('Não foi possível consultar o log')
    }
  }


  remove(id: number) {
    return `This action removes a #${id} log`;
  }
}
