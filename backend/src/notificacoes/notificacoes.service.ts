import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNotificacoeDto } from './dto/create-notificacoe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificacoes } from './entities/notificacoes.entity';
import { Repository } from 'typeorm';
import { WebsocketsGateway } from 'src/gateway/websockets.gateway';

@Injectable()
export class NotificacoesService {

  constructor(
    @InjectRepository(Notificacoes)
    private readonly NotificaoRepository: Repository<Notificacoes>,
    private readonly socketGateway: WebsocketsGateway
  ) {
    
  }

  async create(createNotificacoeDto: CreateNotificacoeDto) {
    try{
      let novaNotificao = this.NotificaoRepository.create()

      novaNotificao.descricao = createNotificacoeDto.descricao
      novaNotificao.tipo      = createNotificacoeDto.tipo
      
      await this.NotificaoRepository.save(novaNotificao)

      this.socketGateway.handleMessage(JSON.stringify(novaNotificao))

      return { status: 200, message: 'Notificação enviada'}
    }catch(error){
      throw new BadRequestException('Não foi possível criar a notificação')
    }
  }

  findAll() {
    try{
      let novaNotificao = this.NotificaoRepository.find({
        where: {
          ativo: true
        }
      })

      return { status: 200, message: novaNotificao}
    }catch(error){
      throw new BadRequestException('Não foi possível consultar as notificações')
    }
  }

  async findOne(id: number) {
    try{
      let notificacao = await this.NotificaoRepository.findOne({
        where: {
          id: id,
          ativo: true
        }
      }) 
      if(!notificacao) return { status: 404, message: 'Nenhuma notificação encontrada'}

      return { status: 200, message: notificacao }
    }catch(error){
      throw new BadRequestException('Não foi possível consultar a notificação')
    }
  }


  async remove(id: number) {
    try{
      let notificacao = await this.NotificaoRepository.findOne({
        where: {
          id: id
        }
      }) 
      if(!notificacao) return { status: 404, message: 'Nenhuma notificação encontrada'}

      notificacao.ativo = false

      return { status: 200, message: 'Notificação removida com sucesso'}
    }catch(error){
      throw new BadRequestException('Não foi possível remover a notificação')
    }
  }
}
