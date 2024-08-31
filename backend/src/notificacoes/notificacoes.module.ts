import { Module } from '@nestjs/common';
import { NotificacoesService } from './notificacoes.service';
import { NotificacoesController } from './notificacoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notificacoes } from './entities/notificacoes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notificacoes])],
  controllers: [NotificacoesController],
  providers: [NotificacoesService],
})
export class NotificacoesModule {}
