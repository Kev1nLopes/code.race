import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AreasModule } from './areas/areas.module'
import { AuthModule } from './auth/auth.module'
import { LogsModule } from './logs/logs.module'
import { MarkersModule } from './markers/markers.module'
import { NotificacoesModule } from './notificacoes/notificacoes.module'
import { UsuariosModule } from './usuarios/usuarios.module'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.SUPABASE_URL,
      port: 5432,
      username: process.env.SUPABASE_USER,
      password: process.env.SUPABASE_PASSWORD,
      database: process.env.SUPABASE_DB,
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsuariosModule,
    AreasModule,
    LogsModule,
    MarkersModule,
    NotificacoesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
