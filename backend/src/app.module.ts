import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AreasModule } from './areas/areas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env'}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'hellpis',
      database: 'race',
      synchronize: true,
      autoLoadEntities: true,
    }), 
    UsuariosModule,
    AreasModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
