import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { WebsocketsGateway } from 'src/gateway/websockets.gateway'
import { Usuario } from 'src/usuarios/entities/usuario.entity'
import { Repository } from 'typeorm'
import { CreateNotificacoeDto } from './dto/create-notificacoe.dto'
import { Notificacoes } from './entities/notificacoes.entity'

@Injectable()
export class NotificacoesService {
  constructor(
    @InjectRepository(Notificacoes)
    private readonly NotificaoRepository: Repository<Notificacoes>,
    private readonly socketGateway: WebsocketsGateway,
  ) {}

  async create(createNotificacoeDto: CreateNotificacoeDto, user: Usuario) {
    try {
      let novaNotificao = this.NotificaoRepository.create()

      novaNotificao.titulo = createNotificacoeDto.titulo
      novaNotificao.descricao = createNotificacoeDto.descricao
      novaNotificao.tipo = createNotificacoeDto.tipo
      novaNotificao.sender = user

      await this.NotificaoRepository.save(novaNotificao)

      this.socketGateway.handleMessage(JSON.stringify(novaNotificao))

      return novaNotificao
    } catch (error) {
      throw new BadRequestException('Não foi possível criar a notificação')
    }
  }

  findAll() {
    try {
      return this.NotificaoRepository.find({
        where: {
          ativo: true,
        },
        relations: {
          sender: true,
        },
      })
    } catch (error) {
      throw new BadRequestException(
        'Não foi possível consultar as notificações',
      )
    }
  }

  async findOne(id: number) {
    try {
      let notificacao = await this.NotificaoRepository.findOne({
        where: {
          id: id,
          ativo: true,
        },
      })
      if (!notificacao)
        return { status: 404, message: 'Nenhuma notificação encontrada' }

      return { status: 200, message: notificacao }
    } catch (error) {
      throw new BadRequestException('Não foi possível consultar a notificação')
    }
  }

  async remove(id: number) {
    try {
      let notificacao = await this.NotificaoRepository.findOne({
        where: {
          id: id,
        },
      })
      if (!notificacao)
        return { status: 404, message: 'Nenhuma notificação encontrada' }

      notificacao.ativo = false

      return { status: 200, message: 'Notificação removida com sucesso' }
    } catch (error) {
      throw new BadRequestException('Não foi possível remover a notificação')
    }
  }
}
