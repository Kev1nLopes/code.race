import { Module } from '@nestjs/common';
import { NotificacoesService } from './notificacoes.service';
import { NotificacoesController } from './notificacoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notificacoes } from './entities/notificacoes.entity';
import { WebsocketsGateway } from 'src/gateway/websockets.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Notificacoes])],
  controllers: [NotificacoesController],
  providers: [NotificacoesService, WebsocketsGateway],
})
export class NotificacoesModule {}
